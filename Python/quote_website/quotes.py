from flask import Flask, render_template, request
import sqlite3
import random

app = Flask(__name__)

def insert(quote, author):
    conn = sqlite3.connect('quotes.db')
    c = conn.cursor()
    c.execute("INSERT INTO quotes (quote, author) VALUES (?, ?)", (quote, author))
    conn.commit()
    conn.close()

def delete(id):
    conn = sqlite3.connect('quotes.db')
    c = conn.cursor()
    c.execute("DELETE FROM quotes WHERE id=?", (id,))
    conn.commit()
    conn.close()

def db_query():
    global quotes
    conn = sqlite3.connect('quotes.db')
    c = conn.cursor()
    quotes = c.execute("SELECT * from quotes")
    quotes = list(quotes)
    conn.close()

@app.route("/")
def index():
    db_query()
    num = random.randint(0, len(quotes) - 1)
    return render_template("index.html", quotes = quotes, num = num)

@app.route("/quote_list")
def quote_list():
    db_query()
    return render_template("quote_list.html", quotes = quotes)

@app.route("/send", methods = ['GET'])
def send():
    data = request.args['data']
    data2 = request.args['data2']
    insert(data, data2)
    db_query()
    return render_template("/quote_list.html", quotes = quotes)

@app.route("/delete", methods = ['GET'])
def delete_quote():
    id = request.args['delete']
    delete(id)
    db_query()
    return render_template("/quote_list.html", quotes = quotes)

if __name__ == "__main__":
    app.run(debug = True)

# c.execute("""CREATE TABLE quotes (
#             id integer primary key,
#             quote,
#             author
#             )""")