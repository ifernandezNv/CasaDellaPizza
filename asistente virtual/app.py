import os
import openai
from dotenv import load_dotenv
from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin

import json

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def index():
    return render_template("recorder.html")


@app.route("/audio", methods=["POST"])
@cross_origin()
def audio():
    audio = request.files.get("audio")
    audio.save("audio.mp3")
    audio_file = open("audio.mp3", "rb")
    transcribed = openai.Audio.transcribe("whisper-1", audio_file)

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-0613",
        messages = [
            {"role": "system", "content": "Eres un asistente amigable y empático"},
            {"role": "user", "content": transcribed.text}
        ], functions = [
            {
                "name": "create_order",
                "description": "Crear un pedido de manera automática",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "pizzas": {
                            "type": "object",
                            "properties": {
                                "nombre": {
                                    "type": "string",
                                    "description": "Nombre de la pizza"
                                },
                                "ingredients": {
                                    "type": "object",
                                    "properties": {
                                        "name": {
                                            "type": "string",
                                            "description": "Nombre del ingrediente"
                                        },
                                        "quantity": {
                                            "type": "string",
                                            "description": "Cantidad/porciones del ingrediente"
                                        },
                                    }
                                }
                            }
                        },
                        "complements": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "description": "nombre del complemento"
                                },
                                "quantity": {
                                    "type": "string",
                                    "description": "Porciones del complemento a adquirir"
                                }
                            }
                        },
                        "dips": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "description": "nombre del dip"
                                },
                                "quantity": {
                                    "type": "string",
                                    "description": "Porciones del dip a adquirir"
                                }
                            }
                        }
                    }
                }
            },
            {
                "name":"set_address",
                "description": "Crear un pedido de manera automática",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "street": {
                            "type": "string",
                            "description": "Calle del domicilio"
                        },
                        "block": {
                            "type": "string",
                            "description": "Colonia del domicilio"
                        },
                        "houseNumber": {
                            "type": "string",
                            "description": "Número/identificador del domicilio"
                        },
                    }
                }
            },
        ],
        function_call = "auto"
    )
    message = response["choices"][0]["message"]
    print("Respuesta de a API: ", message)
    if message.get("function_call"):
        function_name = message["function_call"]["name"]
        args = message.to_dict()["function_call"]['arguments']
        args = json.loads(args)
        call = args
        return {"text": call}
    else:
        return {"text": "No tenemos registrada esta función"}

