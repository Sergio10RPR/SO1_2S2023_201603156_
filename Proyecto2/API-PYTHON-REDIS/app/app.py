from flask import Flask, request, jsonify
import json
import redis

app = Flask(__name__)

# Conexión a la base de datos Redis
redis_client = redis.StrictRedis(host='35.238.205.179', port=6379, db=0)

# Ruta para recibir datos JSON y almacenarlos en Redis
@app.route('/agregar_alumno', methods=['POST'])
def agregar_alumno():
    data = request.get_json()
    
    # Verifica si el JSON recibido tiene las claves necesarias
    if 'nombre' in data and 'curso' in data and 'nota' in data and 'semestre' in data and 'year' in data:
        # Obtén el valor incremental como clave
        alumno_id = get_incremental_key()
        
        # Agrega el valor incremental como una clave en los datos del alumno
        data['alumno_id'] = alumno_id
        
        # Convierte el JSON en una cadena para almacenarlo en Redis
        json_data = json.dumps(data)
        
        # Almacena los datos en Redis con la clave 'alumno:{alumno_id}'
        redis_client.set(f'alumno:{alumno_id}', json_data)
        
        return "Alumno agregado correctamente.", 200
    else:
        return "JSON incompleto o incorrecto", 400

# Función para obtener un valor incremental único
def get_incremental_key():
    # Utiliza la función INCR para obtener un valor incremental único
    return redis_client.incr('alumno_id')

# Ruta para consultar la cantidad de alumnos en un curso y semestre específico
@app.route('/consultar', methods=['GET'])
def consultar():
    curso = request.args.get('curso')
    semestre = request.args.get('semestre')
    
    # Obtén todas las claves almacenadas en Redis
    keys = redis_client.keys('alumno:*')
    
    # Filtra las claves que coinciden con el curso y semestre especificados
    alumnos_en_curso_semestre = []
    
    for key in keys:
        data = json.loads(redis_client.get(key))
        if data['curso'] == curso and data['semestre'] == semestre:
            alumnos_en_curso_semestre.append(data)
    
    # Devuelve la cantidad de alumnos encontrados
    return jsonify({'cantidad_alumnos': len(alumnos_en_curso_semestre)})

@app.route('/hola_mundo', methods=['GET'])
def hola_mundo():
    return "Hola Mundo", 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
