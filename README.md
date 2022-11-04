# Table
Crear tablas usando js

## cdn
https://raw.githack.com/OrozcoOscar/Table/main/table.js


https://raw.githack.com/OrozcoOscar/Table/main/table.css

# Instalación 
```html
<link rel="stylesheet" href="https://raw.githack.com/OrozcoOscar/Table/main/table.css">
<script src="https://kit.fontawesome.com/b5be18ffec.js" crossorigin="anonymous"></script>
<script src="https://raw.githack.com/OrozcoOscar/Table/main/table.js"></script>



  <script>
        let json=[{
            name:"oscar",
            lasname:"Orozco"
        },{
            name:"Ana",
            lasbane:"Sofia"
        }]

        let tabla=new Table(json,"body",option=[{
                button: "Eliminar",
                onClick: "eliminar"
            }])
        tabla.generate()
        function eliminar(b,id){
            document.querySelector("#" + id).remove()
        }
 </script>
   
```
