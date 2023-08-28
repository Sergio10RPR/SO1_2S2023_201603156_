#include <linux/module.h>
// para usar KERN_INFO
#include <linux/kernel.h>
//Header para los macros module_init y module_exit
#include <linux/init.h>
//Header necesario porque se usara proc_fs
#include <linux/proc_fs.h>
/* for copy_from_user */
#include <asm/uaccess.h>	
/* Header para usar la lib seq_file y manejar el archivo en /proc*/
#include <linux/seq_file.h>
#include <linux/sys.h>
#include <linux/mm.h>


MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Módulo Memoria RAM, Laboratorio Sistemas Operativos 1");
MODULE_AUTHOR("Sergio Rivelino ");


struct sysinfo si;

static int escribir_archivo(struct seq_file *archivo, void *v)
{
    //const double megabyte = 1024*1024;
    si_meminfo(&si);
    seq_printf(archivo,"Total RAM : %lu : KB\n",si.totalram);
    seq_printf(archivo,"Total RAM : %lu : MB\n",si.totalram/(1024));
    seq_printf(archivo,"FREE  RAM : %lu : KB\n",si.freeram);
    seq_printf(archivo,"USED  RAM : %lu : KB\n",si.totalram - si.freeram - si.bufferram);
    //seq_printf(archivo,"Total RAM   : %lu GB\n",si.freeram + si.bufferram);
    //seq_printf(archivo,"----------");
   
    
    return 0;
}

//Funcion que se ejecuta cuando se le hace un cat al modulo.
static int al_abrir(struct inode *inode, struct file *file)
{
    return single_open(file, escribir_archivo, NULL);
}

// Si el su Kernel es 5.6 o mayor
static struct proc_ops operaciones =
{
    .proc_open = al_abrir,
    .proc_read = seq_read
};

static int _insert(void)
{
    proc_create("ram_201603156", 0, NULL, &operaciones);
    printk(KERN_INFO "201603156\n");
    return 0;
}

static void _remove(void)
{
    remove_proc_entry("ram_201603156", NULL);
    printk(KERN_INFO "Sistemas Operativos 1\n");
}

module_init(_insert);
module_exit(_remove);