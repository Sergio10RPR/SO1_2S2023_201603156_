const {Router} = require('express')
const {connect} = require('../database/configdb')
const router = Router()

router.get('/home',async(req,res)=>{
   
    
    res.status(200).json({mensaje:'Mensaje de prueba-------->'});
    
  
    
})

router.get('/cursosAlumnosBySemestre/:semestre', async (req, res) => {
    try {
        const { semestre } = req.params;

        // Consulta SQL
        const sql = `
            SELECT curso, semestre, COUNT(carnet) AS cantidad_alumnos
            FROM nota
            WHERE semestre = ?
            GROUP BY curso, semestre
            ORDER BY cantidad_alumnos DESC
            LIMIT 5
        `;

        const result = await (await connect()).query(sql, [semestre]);
        console.log(result);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(200).json({ mensaje: 'No existen datos' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error Server Internal', mensaje: error.message });
    }
});


router.get('/mejoresPromedios', async (req, res) => {
    try {
        

        // Consulta SQL
        const sql = `
        SELECT carnet, AVG(nota) AS promedio
        FROM nota
        GROUP BY carnet
        ORDER BY promedio DESC
        LIMIT 5;
        `;

        const result = await (await connect()).query(sql);
        console.log(result);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(200).json({ mensaje: 'No existen datos' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error Server Internal', mensaje: error.message });
    }
});

router.get('/aproRepro', async (req, res) => {
    try {

        //http://localhost:3002/aproRepro?semestre=1S&curso=SO1
        
        const semestre = req.query.semestre; 
        const curso = req.query.curso;
        // Consulta SQL
        const sql = `
        SELECT curso, semestre, 
        SUM(CASE WHEN nota > 60 THEN 1 ELSE 0 END) AS aprobados,
        SUM(CASE WHEN nota <= 60 THEN 1 ELSE 0 END) AS reprobados
        FROM nota
        WHERE curso = ? AND semestre = ?
        GROUP BY curso, semestre;
 
        `;

        const result = await (await connect()).query(sql,[curso,semestre]);
        console.log(result);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(200).json({ mensaje: 'No existen datos' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error Server Internal', mensaje: error.message });
    }
});


router.get('/allData', async (req, res) => {
    try {
        

        // Consulta SQL
        const sql = `
        SELECT * FROM nota;
        `;

        const result = await (await connect()).query(sql);
        console.log(result);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(200).json({ mensaje: 'No existen datos' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error Server Internal', mensaje: error.message });
    }
});



module.exports = router;