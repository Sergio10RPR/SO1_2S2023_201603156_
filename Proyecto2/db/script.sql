show databases;
use dbnotas;

CREATE TABLE nota(
	idNota int auto_increment,
	carnet varchar(25),
	nombre varchar(100),
	curso varchar(25),
	nota int,
	semestre varchar(25),
	year varchar(25),
	primary key(idNota)
);
DROP TABLE nota;

/*AÑO=2023  NOTA=50,60,70....   SEMESTRE=1S,2S   CURSOS=SO1,BD1,LFP,SA, AYD1 */

//Estudiante 1
INSERT INTO nota (carnet,nombre,curso,nota,semestre,year) VALUES("201603156","sergio","SO1","70","1S","2023");
INSERT INTO nota (carnet,nombre,curso,nota,semestre,year) VALUES("201603156","sergio","AYD1","80","1S","2023");
INSERT INTO nota (carnet,nombre,curso,nota,semestre,year) VALUES("201603156","sergio","BD1","90","1S","2023");
INSERT INTO nota (carnet,nombre,curso,nota,semestre,year) VALUES("201603156","sergio","LPF","70","1S","2023");

//Estudiante 2
INSERT INTO nota (carnet,nombre,curso,nota,semestre,year) VALUES("201603157","sergio1","SO1","70","1S","2023");
INSERT INTO nota (carnet,nombre,curso,nota,semestre,year) VALUES("201603158","sergio2","SO1","70","1S","2023");
INSERT INTO nota (carnet,nombre,curso,nota,semestre,year) VALUES("201603159","sergio3","SO1","70","1S","2023");
INSERT INTO nota (carnet,nombre,curso,nota,semestre,year) VALUES("201603160","sergio4","BD1","70","1S","2023");

INSERT INTO nota (carnet,nombre,curso,nota,semestre,year) VALUES("201603161","sergio5","SO1","70","1S","2023");
INSERT INTO nota (carnet,nombre,curso,nota,semestre,year) VALUES("201603162","sergio6","LFP","80","2S","2023");
INSERT INTO nota (carnet,nombre,curso,nota,semestre,year) VALUES("201603163","sergio7","SO1","80","2S","2023");
INSERT INTO nota (carnet,nombre,curso,nota,semestre,year) VALUES("201603164","sergio8","BD1","60","2S","2023");
SELECT * FROM nota;

SELECT curso, semestre, COUNT(carnet) AS cantidad_alumnos
FROM nota
GROUP BY curso, semestre
ORDER BY cantidad_alumnos DESC
LIMIT 5;

SELECT curso, semestre, COUNT(carnet) AS cantidad_alumnos
FROM nota
WHERE semestre = '1S'  -- Reemplaza '1S' con el semestre deseado
GROUP BY curso, semestre
ORDER BY cantidad_alumnos DESC
LIMIT 5;

