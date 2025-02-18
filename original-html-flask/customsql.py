import sqlite3


class CustomSQL:
    def __init__(self, database):
        self.database = database

    # for debugging
    def __str__(self):
        return f"Database queried: {self.database}"

    # getter for database
    @property
    def database(self):
        return self._database

    # setter for database
    @database.setter
    def database(self, database):
        if not database:
            raise ValueError("Invalid database")
        self._database = database

    # object method
    def execute(self, query, *args):
        # args is a tuple
        with sqlite3.connect(self.database) as connection:
            cursor = connection.cursor()
            cursor.execute(query, args)
            if query.upper().startswith("SELECT"):
                return [dict(zip([column[0] for column in cursor.description], row)) for row in cursor.fetchall()]
            connection.commit()
