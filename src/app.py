from cmath import e
from datetime import datetime
from distutils.log import Log
import json
from pickle import DICT
import re
from sqlite3 import connect
from ssl import HAS_TLSv1_1
from turtle import pos
from urllib import response
from flask import Flask, flash, jsonify, redirect, render_template, request, url_for
from flask_mysqldb import MySQL
from config import config
from flask_login import LoginManager, login_user, logout_user, login_required, current_user

from Models.BaseDatos.Logica import Logica


#Models
from Models.ModelUser import ModelUser

#Entities
from Models.entities.User import User

#DECLARACIONES

app = Flask(__name__)
db = MySQL(app)
login_manager_app= LoginManager(app)

logica = Logica(db)

#QUIEN SABE QUE SON ESTAS COSAS

@login_manager_app.user_loader
def load_user(id):
    return ModelUser.get_by_id(db, id)

@app.before_request
def before_request():
    print('Antes de la petición...')

@app.after_request
def after_request(response):
    print('Despues de la peticion...')
    return response

#RUTAS PARA LA SESION

@app.route('/sesion', methods=['GET', 'POST'])
def sesion():
    #Si se llama a esta ruta con el metodo POST entra al If
    if request.method == 'POST':
        #Se crea una plantilla de usuario con los datos aportados
        user =User(0, request.form['username'], request.form['password'], "")
        #Se crea un modelo de usuario donde se verifica que exista el nombre y que el password sea correcto
        logged_user= ModelUser.login(db, user)
        #Si la validacion no esta vacia entra
        if logged_user != None:
            #Si el password es correcto entra
            if logged_user.password:
                #Con una libreria el programa logea al usuario en el sistema
                login_user(logged_user)
                return redirect(url_for('home'))
            else:
                flash("Invalid password...")
                return render_template('auth/sesion.html')
        else:
            flash("User not Found...")
            return render_template('auth/sesion.html')
    else:
        return render_template('auth/sesion.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('sesion'))

@app.route('/register', methods=['GET', 'POST'] )
def register():
    if request.method == 'POST':
        user = User(0, request.form['username'], request.form['password'], request.form['email'] )
        if ModelUser.validacion(db, user):
            ModelUser.registrar(db, user)
            logged_user= ModelUser.login(db, user)
            login_user(logged_user)
            
            return redirect(url_for('home'))
        else:
            flash("Usuario o Correo ya registrado...")
            return render_template('auth/registro.html')
    else:
        return render_template('auth/registro.html')

#RUTAS DE RENDERIZADO

@app.route('/')
@login_required
def home():
    data = logica.obtener_posts()
    return render_template('pagina/home.html', data=data)

@app.route('/post')
@login_required
def post():
    return render_template('pagina/post.html')

@app.route('/contact')
@login_required
def contact():
    return render_template('pagina/contact.html')

@app.route('/about')
@login_required
def about():
    return render_template('pagina/about.html')

@app.route('/<string:nombre>/user_config')
@login_required
def user_config(nombre):
    print(nombre)
    return render_template('pagina/configuracionUser.html')

#RUTAS INTERACTIVAS

@app.route('/postRegistro/crear/<titulo>')
def postRegistro(titulo):
    id = logica.BusquedaTitulo(titulo)
    data={
        'id': id,
        'titulo': titulo,
    }
    return render_template('pagina/postRegistro.html', data=data)

@app.post('/postRegistro/posts')
def create_post():
    new_post = request.get_json()
    now=datetime.now()
    new_post['fecha'] = "{0}-{1}-{2}".format(now.day, now.month, now.year)
    new_post['hora'] = '{0}-{1}-{2}'.format(now.hour, now.minute, now.second)
    row = logica.insertarPost(new_post)
    return jsonify(row)

@app.post('/postRegistro/resumen')
def insert_resumen():
    peticion = request.get_json()
    resumen = peticion['resumen']
    id = peticion['id']
    logica.insertarResumen(id, resumen)
    return jsonify(resumen)

@app.get('/postRegistro/posts/<int:id>')
def buscarPosts(id):
    if(id != "new"):
        sql= "select * from posts where id_post = {}".format(id)
        row = logica.execute_query(sql, True)
        return jsonify(row)
    else:
        return jsonify("new")

@app.post('/User/CurrentUser')
@login_required
def RegresarUsuario():
    peticion = request.get_json()
    now=datetime.now()
    id_titulo = logica.BusquedaTitulo(peticion['post'])
    user = {
        'id': current_user.id,
        'fecha': "{0}-{1}-{2}".format(now.day, now.month, now.year),
        'hora': '{0}-{1}-{2}'.format(now.hour, now.minute, now.second),
        'comentario' : peticion['Comentario'],
        'id_titulo': id_titulo
    }
    
    sql = """insert into comments 
    (id_user, fecha, hora, comentario, id_post) 
    values ('{0}', '{1}', '{2}', '{3}', '{4}')""".format(user['id'], user['fecha'], user['hora'], user['comentario'], user['id_titulo'])
    logica.insert_query(sql)
    comment= logica.comments(peticion['post'], True)
    return jsonify(comment)

@app.route('/posts/<string:titulo>')
def Mostrar_post(titulo):
    sql = "select id_post, titulo, resumen, texto, username, fecha from posts, user where titulo = '{}' and id_author=id_user;".format(titulo)
    row = logica.execute_query(sql, True)
    comentarios= logica.comments(titulo, False)
    return render_template('/pagina/post.html', data=row, data2=comentarios)

@app.get('/CurrentUser')
def regresarUser():
    return jsonify(current_user.username)

#METODOS DE ERRORES


def pagina_no_encontrada(error):
    return render_template('error/404.html'), 404

def status_401(error):
    return redirect(url_for('sesion'))

if __name__ == '__main__':
    #app.add_url_rule('/query_string', view_func=query_string)
    app.register_error_handler(404, pagina_no_encontrada)
    app.register_error_handler(401, status_401)
    app.config.from_object(config['development'])
    app.run()

"""
def Obtener_post(valor):
    cursor = db.connection.cursor()
    try:
        id = int(valor)
        sql = "select * from posts where id = {}".format(id)
    except TypeError:
        sql = "select * from posts where titulo = {}".format(valor)
    cursor.execute(sql)
    row = cursor.fetchone()
    return row

@app.route('/protected')
@login_required
def protected():
    return "<h1>Vista protegida: Solo usuarios</h1>

@app.route('/contacto/<string:nombre>/<int:edad>')
def contacto(nombre, edad):
    data={
        'titulo' : 'Contacto',
        'nombre' : nombre,
        'edad' : edad
    }
    return render_template('contacto.html', data=data)

@app.route('/home')
@login_required
def home():
    return render_template('home.html')

def query_string():
    print(request)
    print(request.args)
    print(request.args.get('param1'))
    print(request.args.get('param2'))
    return 'ok'

@app.route('/animes')
def listar_animes():
    data={}
    try:
        cursor = conexion.connection.cursor()
        sql = "SELECT id_anime, nombre, temporadas, capitulos FROM animes_vistos ORDER BY nombre ASC"
        cursor.execute(sql)
        animes=cursor.fetchall()
        #print(animes)
        data['animes'] = animes
        data['mensaje'] = 'Exito'
    except Exception as ex:
            data['mensaje'] = 'Error...'
    #return jsonify(data['animes'][0][0])
    return render_template('animes.html', data=data['animes'])
"""