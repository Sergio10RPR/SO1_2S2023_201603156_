package main

import (
	"bufio"

	"fmt"
	"os/exec"
	"strconv"
	"strings"
	"time"
)

func main() {
	//Lee el archivo /proc/

	var lines []string

	var totalRam string
	var usedRam string
	var totalRamConverted float32 //Cambiar a float después
	var usedRamConverted float32

	//Aquí inicia el for
	/*#############################################################################################*/
	for {
		//Ejecutar el comando cat para leer el archivo generado por el módulo
		time.Sleep(3000000 * time.Microsecond)
		cmd := exec.Command("cat", "/proc/ram_201603156")

		stdout, err := cmd.StdoutPipe()

		//--------------------Lectura y captura de errores del archivo ram_201603156---------------
		if err != nil {
			fmt.Println("Error:", err)
			return
		}
		if err := cmd.Start(); err != nil {
			fmt.Println("Error:", err)
			return
		}
		scanner := bufio.NewScanner(stdout)
		for scanner.Scan() {
			//fmt.Println(scanner.Text())
			lineaInfo := scanner.Text()
			lines = append(lines, lineaInfo)
		}
		if err := scanner.Err(); err != nil {
			fmt.Println("Error:", err)
			return
		}
		if err := cmd.Wait(); err != nil {
			fmt.Println("Error:", err)
			return
		}
		//--------------------Lectura y captura de errores del archivo cpu_201603156---------------

		//Recorriendo la lista. En la lista almacenamos todas las líneas de texto del archivo
		fmt.Println("Recorriendo la lista")
		for indic, valor := range lines {
			//fmt.Println(indic, valor)

			if indic == 0 {
				valores := strings.Split(valor, ":")
				totalRam = strings.ReplaceAll(valores[1], " ", "")
				totalRamFloat, errF := strconv.ParseFloat(totalRam, 32)

				if errF != nil {
					fmt.Println("Error al convertir la cadena a un valor entero:", err)
					return
				}
				totalRamConverted = float32(totalRamFloat)
				fmt.Println("Total RAM:", totalRamConverted)
			}
			if indic == 3 {
				valores := strings.Split(valor, ":")
				usedRam = strings.ReplaceAll(valores[1], " ", "")

				usedFloat, errF := strconv.ParseFloat(usedRam, 32)
				if errF != nil {
					fmt.Println("Error al convertir la cadena a un valor entero:", err)
					return
				}
				usedRamConverted = float32(usedFloat)
				fmt.Println("Used RAM", usedRamConverted)
			}

		} //For de recorrido de la lista
		//Insertar los datos a la base de datos

	}
	//Aquí termina el for
	/*#############################################################################################*/
}
