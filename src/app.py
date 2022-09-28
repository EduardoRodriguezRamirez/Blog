import re
from ssl import HAS_TLSv1_1
from urllib import response
from flask import Flask, flash, jsonify, redirect, render_template, request, url_for
from flask_mysqldb import MySQL
from config import config
from flask_login import LoginManager, login_user, logout_user, login_required
from flask_wtf.csrf import CSRFProtect 

#Models
from Models.ModelUser import ModelUser

#Entities
from Models.entities.User import User

app = Flask(__name__)

csrf=CSRFProtect()
db = MySQL(app)
login_manager_app= LoginManager(app)


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

#Este metodo permite los metodos de POST y GET
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
                return redirect(url_for('pagina'))
            else:
                flash("Invalid password...")
                return render_template('auth/sesion.html')
        else:
            flash("User not Found...")
            return render_template('auth/sesion.html')
    else:
        return render_template('auth/sesion.html')

@app.route('/register', methods=['GET', 'POST'] )
def register():
    print("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    if request.method == 'POST':
        user = User(0, request.form['username'], request.form['password'], request.form['email'] )
        if ModelUser.validacion(db, user):
            ModelUser.registrar(db, user)
            logged_user= ModelUser.login(db, user)
            login_user(logged_user)
            return redirect(url_for('pagina'))
        else:
            flash("Usuario o Correo ya registrado...")
            return render_template('auth/registro.html')
    else:
        return render_template('auth/registro.html')

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('sesion'))

@app.route('/home')
@login_required
def home():
    return render_template('home.html')

@app.route('/protected')
@login_required
def protected():
    return "<h1>Vista protegida: Solo usuarios</h1>"

@app.route('/contacto/<string:nombre>/<int:edad>')
def contacto(nombre, edad):
    data={
        'titulo' : 'Contacto',
        'nombre' : nombre,
        'edad' : edad
    }
    return render_template('contacto.html', data=data)

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

def pagina_no_encontrada(error):
    return render_template('404.html'), 404
    #return redirect(url_for('listar_animes'))

def status_401(error):
    return redirect(url_for('sesion'))

@app.route('/')
@login_required

def pagina():
    return render_template('pagina/index.html')

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

@app.route('/postRegistro')
def postRegistro():
    return render_template('pagina/postRegistro.html')

if __name__ == '__main__':
    app.add_url_rule('/query_string', view_func=query_string)
    csrf.init_app(app)
    app.register_error_handler(404, pagina_no_encontrada)
    app.register_error_handler(401, status_401)
    app.config.from_object(config['development'])
    app.run()