# Utiliza una imagen base de Python
FROM python:3.9

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el código de tu API en el contenedor
COPY . /app

# Instala las dependencias
RUN pip install Flask redis

# Expón el puerto 5000 (el puerto en el que Flask se ejecuta por defecto)
EXPOSE 5000

# Define el comando para ejecutar tu API
CMD ["python", "app.py"]
