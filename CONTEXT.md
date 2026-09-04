# Bocadillo

Sitio de catálogo para Bocadillo, un negocio casero peruano que vende combos de sandwich + postre + bebida. El sitio muestra el catálogo y deriva al cliente a WhatsApp o Instagram para coordinar pedido, pago y entrega — no procesa carritos, pagos ni pedidos por sí mismo.

## Language

**Combo**:
La unidad que se vende: una bolsa con un salado (sandwich o petipan), un dulce (cupcake, alfajor o mini donas) y una bebida (refresco de maracuyá). Es lo que el código llama "producto".
_Avoid_: Producto (nombre usado en el código, pero cada uno es siempre un combo, nunca un ítem suelto)

**Categoría**:
Clasificación de un combo dentro del catálogo (sandwiches, dulces, cupcakes, postres), usada para filtrar. Hoy solo "sandwiches" y "dulces" tienen combos reales.

**Presentación**:
El formato de empaque de un combo (por ahora, siempre "Bolsa de papel").

**Pedido**:
La solicitud de uno o más combos que hace un cliente. Se coordina íntegramente por WhatsApp o Instagram (producto, cantidad, fecha, pago y entrega); el sitio nunca guarda ni procesa el pedido.

**Delivery**:
Entrega del pedido en el domicilio del cliente. La dirección y el costo se coordinan por WhatsApp según la zona; no hay tarifas ni zonas publicadas en el sitio.

**Punto de recojo**:
Lugar acordado donde el cliente recoge su pedido en persona, como alternativa al delivery. No hay una dirección fija de tienda: se define caso por caso por WhatsApp.

## Paleta de Colores Oficial
* **White (`#FFFFFF`):** Fondos de tarjetas y superficies limpias de contraste.
* **Antique White (`#F6E9D9`):** Fondo cálido de la marca (Hero, headers, acentos de fondo).
* **Faded Copper (`#B48355`):** Color de acento cálido intermedio (textos secundarios, detalles, bordes).
* **Brown Bark (`#6F3C20`):** Tono marrón intermedio para botones secundarios y acentos profundos.
* **Dark Walnut (`#47210D`):** Color de contraste principal (texto títulos, botones primarios, footer).

## Estructura de Datos de un Combo (`src/data/products.js`)
* `id`: Identificador numérico único.
* `name`: Título descriptivo completo del combo.
* `shortName`: Nombre corto para resúmenes.
* `presentation`: Formato de entrega ("Bolsa de papel").
* `price`: Precio en Soles (S/ float).
* `category`: Categoría para filtrado (`sandwiches`, `dulces`, `cupcakes`, `postres`, `bebidas`).
* `image`: Imagen principal para miniatura.
* `images`: Lista (`Array`) de imágenes para el carrusel de detalle interactivo.
* `items`: Lista de componentes específicos (ej: sandwich, postre, refresco).
* `description`: Texto breve explicativo del combo.


