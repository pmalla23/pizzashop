'''
To run:
set FLASK_APP=Application.py
set FLASK_ENV=development
flask run --port=80

To quit: Ctrl + C (you might have to type this more than once)
'''

import json
import uuid
from flask import Flask, render_template, request, jsonify
import sqlite3 as sql
import os
from markupsafe import escape

currentdir = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)

@app.route("/")
@app.route('/<path:subpath>')
def landing_page(subpath = 'index.html'):
    return render_template(escape(subpath))

@app.route("/submit_order_as_json", methods=["POST"])
def submit_order_as_json():
    order = request.json
    print('The order is:')
    print(order)
    order['id'] = uuid.uuid4()
    order['status'] = 'confirmed'
    firstname=order["customer"]["first_name"]
    lastname=order["customer"]["last_name"]
    id = order["id"]
    status= order["status"]
    cheese=order['pizza'][0]['count']+" "+order['pizza'][0]['pizza_size']+" "+order['pizza'][0]['pizza_type']
    pepperoni=order['pizza'][1]['count']+" "+order['pizza'][1]['pizza_size']+" "+order['pizza'][1]['pizza_type']
    chicken=order['pizza'][2]['count']+" "+order['pizza'][2]['pizza_size']+" "+order['pizza'][2]['pizza_type']
    with sql.connect(currentdir+ "/pizzaorder.db") as con:
        cur = con.cursor()
        cur.execute("INSERT INTO orders (FirstName,LastName,ID,status,cheese, pepperoni, chicken) VALUES (?,?,?,?,?,?,?)",(str(firstname),str(lastname),str(id),str(status),str(cheese),str(pepperoni),str(chicken)))
        con.commit()    
    con.close()
    print(order)
    return jsonify(order)

@app.route("/check_order/<id>",methods=["GET"])
def check_order(id):
    print(id) 
    print("Checking order for ")
    print(id)
    with sql.connect(currentdir+"/pizzaorder.db") as con:
        cur = con.cursor()
        cur.execute("SELECT * FROM orders WHERE ID=?",[id])
        result=cur.fetchall()
    con.close()
    print(result)
    try:
        id==result[0][2]
        return render_template('checkorder.html',order=result)
    except:
        return render_template('checkorder.html', order="error")

if __name__ == "__main__":
    app.run(debug=True)

