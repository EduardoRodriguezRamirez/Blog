class Logica:

    def __init__ (self, db):
        self.db = db

    def comments(self, titulo, one):
        row_comments = self.ListaComentarios(titulo)
        if row_comments != None:
            comentarios = []
            for tupla in range(len(row_comments)):
                tiempo= self.convertirFechaHora(row_comments[tupla][2], row_comments[tupla][3])
                comment = {
                    'nombre': row_comments[tupla][0],
                    'comentario': row_comments[tupla][1],
                    'fecha': tiempo['fecha'],
                    'hora': tiempo['hora']
                }
                comentarios.append(comment)
        else:
            comentarios= None 

        if one:
            return comentarios[0]
        else:
            return comentarios

    def insertarPost(self, post, id_user):
        sql = """insert into posts (titulo, texto,resumen, id_author, fecha, hora)
                values ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}');""".format(post['titulo'], post['texto'], post['resumen'], id_user, post['fecha'], post['hora'])
        self.insert_query(sql)
        return True

    def insertarResumen(self, id, resumen):
        sql = "UPDATE posts set resumen = '{0}' where id_post = '{1}'".format(resumen, id)
        self.insert_query(sql)

    def obtener_posts(self):
        sql = "select titulo, resumen, username, fecha from posts, user where resumen <> '' and id_author=id_user ORDER BY id_post DESC;" 
        row = self.execute_query(sql, False)
        return row

    def obtener_nombre_posts(self):
        sql = "select titulo, username from posts, user where resumen <> '' and id_author=id_user ORDER BY CHAR_LENGTH(titulo) ASC;" 
        row = self.execute_query(sql, False)
        return row

    def BusquedaTitulo(self, titulo):
        sql = 'select id_post, titulo, resumen, texto, id_author, fecha, hora from posts where titulo = "{0}";'.format(titulo)
        row = self.execute_query(sql, True)
        if row == None:
            return "new"
        else:
            return row[0]
    
    def obtenerAutores(self, array):
        authors = []
        for title in array:
            sql = "select username from user, posts where id_author = id_user and titulo='{}'".format(title)
            row = self.execute_query(sql, True)
            authors.append(row)
        return authors

    def obtenerBusqueda(self, busqueda):
        sql = "select titulo, resumen, fecha, username from posts, user where resumen <> '' and id_author=id_user ORDER BY CHAR_LENGTH(titulo) ASC;" 
        row = self.execute_query(sql, False)
        lista = []
        for array in row:
            if busqueda.lower() in array[0].lower():
                lista.append(array)
        return lista

    def obtenerPostEdit(self, titulo):
        sql = "select id_edit, titulo, html_edit, id_author from posts_edit where titulo = '{}';".format(titulo)
        row = self.execute_query(sql, True)
        if row != None:
            return row
        else: 
            return None

    def insertarPostEdit(self, titulo, html, id):
        sql = "insert into posts_edit (titulo, html_edit, id_author) values ('{0}', '{1}', {2});".format(titulo, html, id)
        print(sql)
        self.insert_query(sql)

    def updatePostEdit(self, html, titulo, id):
        sql = "update posts_edit set html_edit = '{0}' where titulo = '{1}' and  id_author = {2};".format(html, titulo, id)
        print(sql)
        self.insert_query(sql)

    def ListaComentarios(self, titulo):
        id_titulo = self.BusquedaTitulo(titulo)
        sql = """select username, comentario, comments.fecha, comments.hora from comments, user, posts 
    where user.id_user = comments.id_user and posts.id_post = comments.id_post and comments.id_post={}
    ORDER BY id_comment DESC;""".format(id_titulo)

        row = self.execute_query(sql, False)
        return row

    def convertirFechaHora(self, fecha, hora):
        hora = hora[0:5]
        tab_hora =hora.split("-")

        hora = "{0}:{1}".format(tab_hora[0], tab_hora[1])

        tab_fecha = fecha.split("-")

        if str.__contains__(tab_fecha[1], "12"):
            tab_fecha[1] = "Dic"
        elif str.__contains__(tab_fecha[1], "11"):
            tab_fecha[1] = "Nov"
        elif str.__contains__(tab_fecha[1], "10"):
            tab_fecha[1] = "Oct"
        elif str.__contains__(tab_fecha[1], "9"):
            tab_fecha[1] = "Sep"
        elif str.__contains__(tab_fecha[1], "8"):
            tab_fecha[1] = "Ago"
        elif str.__contains__(tab_fecha[1], "7"):
            tab_fecha[1] = "Jul"
        elif str.__contains__(tab_fecha[1], "6"):
            tab_fecha[1] = "Jun"
        elif str.__contains__(tab_fecha[1], "5"):
            tab_fecha[1] = "May"
        elif str.__contains__(tab_fecha[1], "4"):
            tab_fecha[1] = "Abr"
        elif str.__contains__(tab_fecha[1], "3"):
            tab_fecha[1] = "Mar"
        elif str.__contains__(tab_fecha[1], "2"):
            tab_fecha[1] = "Feb"
        elif str.__contains__(tab_fecha[1], "1"):
            tab_fecha[1] = "Ene"
    
        fecha= "{0} de {1}, {2}".format(tab_fecha[0], tab_fecha[1], tab_fecha[2])

        tiempo = {
            'fecha': fecha,
            'hora': hora
        }
        return tiempo

    def execute_query(self, sql, one):
        cursor = self.db.connection.cursor()
        cursor.execute(sql)
        if one:
            row = cursor.fetchone()
        else:
            row = cursor.fetchall()
        if row != None:
            return row
        else:
            return None

    def insert_query(self, sql):
        cursor = self.db.connection.cursor()
        cursor.execute(sql)
        self.db.connection.commit()