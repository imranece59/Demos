#!/usr/bin/python

import psycopg2

psycopg2.extensions.register_type(psycopg2.extensions.UNICODE)


class DB:
    connectionInfo = None
    cursor = None
    isConnected = False
    HOST_NAME = 'localhost'
    DB_USER = 'postgres'
    DB_PASS = 'Netradyne123'
    DB_NAME = 'stock_db'

    def __init__(self, arguments=None):
        if (arguments is not None):
            serverName = arguments.get('server', "local")
        else:
            serverName = "local"

        if (serverName == "prod"):
            self.setServerAsBM()
        else:
            print("DB: Using local server...")

        self.connect2DB()

    def connect2DB(self):
        if (self.isConnected == False):
            self.connectionInfo = psycopg2.connect(host=self.HOST_NAME,
                                                   dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS)
            self.isConnected = True

    def setServerAsOpsDB(self):
        print("DB: Using localhost server...")
        self.HOST_NAME = 'localhost'
        self.DB_USER = 'postgres'
        self.DB_PASS = 'Netradyne123'
        self.DB_NAME = 'stock_db'

    # Function to run DB query and get o/p
    def run(self, sql_file):
        query = open(sql_file).read()
        return (self.runCmd(query))

    def runCmd(self, query):
        self.cursor = self.connectionInfo.cursor()
        self.cursor.execute(query)
        if (self.cursor.description is not None):
            return self.cursor.fetchall()
        else:
            return self.cursor.rowcount

    def commit(self):
        self.connectionInfo.commit()

    def getHeaders(self):
        return self.cursor.description


'''
def myMain():
    server = "experimentOps"
    param = { 'server' : server }
    cDB = DB(param)
myMain()
'''