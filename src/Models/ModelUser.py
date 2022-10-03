from .entities.User import User
class ModelUser():

    @classmethod
    def login(self, db, user):
        try:
            cursor = db.connection.cursor()
            if "@" in user.username:
                sql="""SELECT id, username, password, email FROM user
                        where email = '{}'""".format(user.username)
            else:
                sql="""SELECT id, username, password, email FROM user
                        where username = '{}'""".format(user.username)
            cursor.execute(sql)
            row = cursor.fetchone()
            print("No entro")
            if row != None:
                user=User(row[0], row[1], User.check_password(row[2], user.password), row[3])
                print("Entro")
                return user
            else:
                return None
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_by_id(self, db, id):
        try:
            cursor = db.connection.cursor()
            sql="""SELECT id, username, email FROM user
                    where id = {}""".format(id)
            cursor.execute(sql)
            row = cursor.fetchone()
            if row != None:
                logged_user=User(row[0], row[1], None, row[2])
                return logged_user
            else:
                return None
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def validacion(self, db, user):
        try:
            cursor = db.connection.cursor()
            sql="""SELECT username, email FROM user
                    where username = '{0}' OR email = '{1}'""".format(user.username, user.email)
            cursor.execute(sql)
            row = cursor.fetchone()
            if row != None:
                return False
            else:
                return True
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def registrar(self, db, user):
        try:
            cursor = db.connection.cursor()
            sql="""insert into user (username, password, email)  VALUES 
                    ('{0}', '{1}', '{2}')""".format(user.username, User.password_creator(user.password), user.email)
            cursor.execute(sql)
            db.connection.commit()

            
        except Exception as ex:
            raise Exception(ex)