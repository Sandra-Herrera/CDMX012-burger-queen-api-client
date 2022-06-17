# COFFEE TIME (API Client)

## Índice

* [1. Coffee Time](#1-Coffe-Time) 
* [2. Mock API y Firebase](#2-Mock-API-y-Firebase)
* [3. Conociendo al usuario](#3-Conociendo-al-usuario)
* [4. Historias de usuario](#4-Historias-de-usuario)
* [5. Flujo de la aplicación](#5-Flujo-de-la-aplicación)
* [6. Diseño de la Interfaz del Usuarix](#6-Diseño-de-la-interfaz-del-usuariX)
* [7. Vista final](#7-Vista-final)
* [8. Conoce la app](#8-Conoce-la-app)

***

## 1. Coffee Time

Desarrollamos una aplicación en React como una single page application para una pequeña cafetería, que está creciendo y necesita un
sistema a través del cual puedan tomar pedidos y enviarlos
a la cocina para que se preparen ordenada y eficientemente.

![burger-queen](https://user-images.githubusercontent.com/110297/42118136-996b4a52-7bc6-11e8-8a03-ada078754715.jpg)

Esta es la información que tenemos dxl clientx:

> Somos **Coffee Time**, una cafetería que ofrece servicios para el desayuno y la cómida.
>
> Nuestra propuesta de servicio ha tenido muy buena acogida y, para
> seguir creciendo, necesitamos un sistema que nos ayude a tomar los pedidos de
> nuestrxs clientxs.
>
> Tenemos 2 menús: uno muy sencillo para el desayuno:
>
> | Ítem                      |Precio $|
> |---------------------------|------|
> | Scrambled eggs            |   25 |
> | Orange juice              |   17 |
> | American coffee           |   15 |
> | Frapuchino coffe          |   15 |
  | Natural water             |   25 |
>
> Y otro menú para el resto del día:
>
> | Ítem                      |Precio|
> |---------------------------|------|
> |Pasta bolognese            |    25|
> |Chicken baguette           |    20|
> |Pepperoni pizza            |    30|
> |Cheesecake                 |    15|
> |Red velvet cake            |    15|
> |Soda 500ml                 |    15|
> |Mineral water 100ml        |    10|
>
> Nuestrxs clientxs son bastante indecisos, por lo que es muy común que cambien
> el pedido varias veces antes de finalizarlo.

La interfaz debe mostrar los dos menús (desayuno y resto del día), cada uno
con todos sus _productos_. el usuarie debe poder ir eligiendo qué _productos_
agregar y la interfaz debe ir mostrando el _resumen del pedido_ con el
costo total.

![out](https://user-images.githubusercontent.com/110297/45984241-b8b51c00-c025-11e8-8fa4-a390016bee9d.gif)

Además la clienta nos ha dado un [link a la documentación](https://laboratoria.github.io/burger-queen-api/)
que especifica el comportamiento esperado de la API HTTP que deberás consumir.

## 2. Mock API y Firebase
Para este proyecto creamos tres APIs en Json Server, la primera, **Products**, en la cual guardamos los prodctos, sus precios, categoría(breakfast y lunch/dinner) y le asignamos un id aleatrorio; la segunda, **chosenProduct**, en la cual se actualizan los productos que ordena el cliente, la mesa que tiene asignada, las fechas y horas de creación y finalización de ese pedido y el tiempo que tardó en realizarse la órden en cocina; y por último **team**, aquí guardamos la información de cada uno de los colaboradores, sus nombres, correos, el rol que cumplen y la contraseña que tienen asignada para el ingreso a su cuenta. A continuación puedes ver la arquitectura de nuestras APIs

![api](https://raw.githubusercontent.com/Melissa-Bracamonte/CDMX012-burger-queen-api-client/develop_sandy/burger-queen/src/imgs/interfazApi.jpg)

Para el inicio de sesión y el registro de nuevos empleados utilizamos el servicio de autenticación de Firebase

![firebase](https://raw.githubusercontent.com/Melissa-Bracamonte/CDMX012-burger-queen-api-client/develop_sandy/burger-queen/src/imgs/firebaseUsuarios.JPG)

## 3. Conociendo al usuario

Para este proyecto tenemos 3 tipos de usuarios, los meseros, el jefe de cocina y el/lxs administradores. 
* Los meseros deben poder tomar el pedido de unx cliente para enviarlo al jefe de cocina y saber cuánto cobrar y debe poder ver los pedidos que están listos en cocina para su entrega.
* Por su parte el jefe de cocina debe ver los pedidos de los clientes en orden, marcar cuales estan listos y avisar a lxs meserxs que un pedido está listo para servirlo a un clientx.
* El administrador debe tener acceso a las vistas del mesero y el jefe de cocina y además debe poder gestionar a los usuarios de la plataforma para mantener actualizado la informacion de sus trabajadorxs, por otro lado, debe poder gestionar los productos para mantener actualizado el menú.

Para asegurarnos que la app fuese intuitiva para el usuario realizamos test de usuabilidad en la herramienta Maze y tomamos todo el feedeback para mejorar la experiencia del usuario en el flujo de la aplicación.

## 4. Historias de usuario

Con base en lo anterior, diseñamos las siguientes historias de usuario que fueron la base de la planeación de este proyecto:

#### [Historia de usuario 1] Mesero/a debe poder ingresar al sistema, si el admin ya le ha asignado credenciales

Yo como meserx quiero poder ingresar al sistema de pedidos.

##### Criterios de aceptación

Lo que debe ocurrir para que se satisfagan las necesidades del usuario.

* Acceder a una pantalla de login.
* Ingresar email y contraseña.
* Recibir mensajes de error comprensibles, dependiendo de cuál es el error
  con la información ingresada.
* Ingresar al sistema de pedidos si las crendenciales son correctas.

##### Definición de terminado

Lo acordado que debe ocurrir para decir que la historia está terminada.

* Debes haber recibido _code review_.
* Haber testeado el producto manualmente.
* Haber hecho _tests_ de usabilidad e incorporado el _feedback_ del usuario.
* Desplegar la aplicación y etiquetar la versión (git tag).

***

#### [Historia de usuario 2] Mesero/a debe poder tomar pedido de cliente/a

Yo como meserx quiero tomar el pedido de unx clientx para no depender de mi mala
memoria, para saber cuánto cobrar, y enviarlo a la cocina para evitar errores y
que se puedan ir preparando en orden.

##### Criterios de aceptación

Lo que debe ocurrir para que se satisfagan las necesidades del usuario

* Anotar número de mesa, teniendo en cuenta que la cafeteria cuenta con 4 mesas.
* Agregar productos al pedido.
* Eliminar productos.
* Ver resumen y el total de la compra.
* Enviar pedido a cocina (guardar en alguna base de datos).
* Se ve y funciona bien en una _tablet_

##### Definición de terminado

Lo acordado que debe ocurrir para decir que la historia está terminada.

* Debes haber recibido _code review_.
* Haber testeado el producto manualmente.
* Haber hecho _tests_ de usabilidad e incorporado el _feedback_ del usuario.
* Desplegar la aplicación y etiquetar la versión (git tag).

***

#### [Historia de usuario 3] Jefe de cocina debe ver los pedidos

Yo como jefx de cocina quiero ver los pedidos de lxs clientxs en orden y
marcar cuáles están listos para saber qué se debe cocinar y avisar a lxs meserxs
que un pedido está listo para servirlo a un clientx.

##### Criterios de aceptación

* Ver los pedidos ordenados según se van haciendo.
* Marcar los pedidos que se han preparado y están listos para servirse.
* Ver el tiempo que tomó prepara el pedido desde que llegó hasta que se
  marcó como completado.
* Ocultar pedido enviado de la interfaz.

##### Definición de terminado

* Debes haber recibido _code review_.
* Haber testeado el producto manualmente.
* Haber hecho _tests_ de usabilidad e incorporado el _feedback_ del usuario.
* Desplegar la aplicación y etiquetar la versión (git tag).

***

#### [Historia de usuario 4] Meserx debe ver pedidos listos para servir

Yo como meserx quiero ver los pedidos que están preparados para entregarlos
rápidamente a lxs clientxs que las hicieron.

##### Criterios de aceptación

* Ver listado de pedido listos para servir.
* Marcar pedidos que han sido entregados.
* Ocultar pedidos entregados de la interfaz.

##### Definición de terminado

* Debes haber recibido _code review_.
* Haber testeado el producto manualmente.
* Haber hecho _tests_ de usabilidad e incorporado el _feedback_ del usuario.
* Desplegar la aplicación y etiquetar la versión (git tag).
* Los datos se deben mantener íntegros, incluso después de que un pedido ha
  terminado. Todo esto para poder tener estadísticas en el futuro.

***

#### [Historia de usuario 5] Administrador(a) de tienda debe administrar a sus trabajadorxs

Yo como administrador(a) de tienda quiero gestionar a los usuarios de
la plataforma para mantener actualizado la informacion de mis trabajadorxs.

##### Criterios de aceptación

* Ver listado de trabajadorxs.
* Agregar trabajadorxs.
* Eliminar trabajadoxs.
* Actualizar datos de trabajadorxs.

##### Definición de terminado

* Debes haber recibido _code review_.
* Haber testeado el producto manualmente.
* Haber hecho _tests_ de usabilidad e incorporado el _feedback_ del usuario.
* Desplegar la aplicación y etiquetar la versión (git tag).

***

#### [Historia de usuario 6] Administrador(a) de tienda debe administrar a sus productos

Yo como administrador(a) de tienda quiero gestionar los productos
para mantener actualizado el menú.

##### Criterios de aceptación

* Ver listado de productos.
* Agregar productos.
* Eliminar productos.
* Actualizar datos de productos.

##### Definición de terminado

* Debes haber recibido _code review_.
* Haber testeado el producto manualmente.
* Haber hecho _tests_ de usabilidad e incorporado el _feedback_ del usuario.
* Desplegar la aplicación y etiquetar la versión (git tag).


## 5. Flujo de la aplicación

Teniendo en cuenta los requerimientos y las historias de usuario, diseñamos este diagrama de flujo que representa el flujo de trabajo que seguirá
la app:

![diagrama-de-flujo](https://raw.githubusercontent.com/Melissa-Bracamonte/CDMX012-burger-queen-api-client/develop_sandy/burger-queen/src/imgs/Diagrama%20de%20flujo.JPG)

## 6. Diseño de la Interfaz de Usuarix

Siguiendo el diagrama de flujo desarrollado con anterioridad, creamos un diseño en Figma intuitivo, que facilite el trabajo que diariamente realiza la cafetería, a continuación te compartimos el [link de nuestro prototipo interactivo en Figma](https://www.figma.com/proto/PuSWwsH0oligkFOPJlLWsl/Burger-Queen?node-id=11%3A32&scaling=scale-down&page-id=0%3A1&starting-point-node-id=11%3A32)

## 7. Vista final

Todo lo anterior dio como resultado nuestra interfaz en desktop, tablet y en móbil:

![interfaz-1](https://raw.githubusercontent.com/Melissa-Bracamonte/CDMX012-burger-queen-api-client/develop_sandy/burger-queen/src/imgs/interfaz1.jpg)
![interfaz-2](https://raw.githubusercontent.com/Melissa-Bracamonte/CDMX012-burger-queen-api-client/develop_sandy/burger-queen/src/imgs/interfaz2.jpg)
![interfaz-3](https://raw.githubusercontent.com/Melissa-Bracamonte/CDMX012-burger-queen-api-client/develop_sandy/burger-queen/src/imgs/interfaz3.jpg)
![interfaz-4](https://raw.githubusercontent.com/Melissa-Bracamonte/CDMX012-burger-queen-api-client/develop_sandy/burger-queen/src/imgs/interfaz4.jpg)
![interfaz-5](https://raw.githubusercontent.com/Melissa-Bracamonte/CDMX012-burger-queen-api-client/develop_sandy/burger-queen/src/imgs/tabletMobile.jpg)

## 8. Conoce la app
Prueba la aplicación y conoce lo que cada uno de los tres roles (administrador, mesero y jefe de cocina) puede hacer ella, para que tengas una mejor experiencia, te contamos más acerca de cada uno de estos roles.

Visita nuestra app **aquí**:

* **Administrador:** tiene autorización para ingresar a todas las vistas, pero su rol principal en la app es el de administrar los productos y al equipo, por ende puede agregar nuevos productos y empleados, editarlos y eliminarlos. Si quieres conocer el flujo del proceso de un administradorx en nuestra app, te invitamos a navegar con la siguiente cuenta: 
- Cuenta: admin@coffetime.com
- Contraseña: coffetime
* **Meseros:** su interfaz se llama **Order**, en ella puede ver filtrado el menú correspondiente a desayuno y cómida, además puede agregar cualquier alimento del menú a la lista de pedidos y enviarlo a cocina, además puede elegir el número de la mesa y ver el total que esa mesa debe pagar. Si quieres conocer el flujo del proceso de unx meserx en nuestra app, te invitamos a navegar con la siguiente cuenta: 
- Cuenta: mesero@coffetime.com
- Contraseña: coffetime
* **Jefe de cocina:** su interfaz se llama **Kitchen**, en ella puede ver todas ódenes que el mesero envía y la cantidad que pide por cada óden,
además cada órden tiene un crónometro que marca el tiempo desde que el mesero la envío hasta que el jefe de cocina la marca como lista, de este modo el jefe de cocina puede saber cuanto tarda su equipo en preparar cada alimento y el administrador puede tener el historico de los alimentos que más tardan en prepararse. Si quieres conocer el flujo del proceso del jefx de cocina en nuestra app, te invitamos a navegar con la siguiente cuenta: 
- Cuenta: cocina@coffetime.com
- Contraseña: coffetime