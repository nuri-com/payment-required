# Tu wallet, tarjeta y cuenta bancaria para tu agente.

> Una wallet de autocustodia, tarjeta Visa y cuenta bancaria para tu agente. Pagos cotidianos por chat o una URL MCP para tu agente. Sin clave API de integración.

Envía dinero. Compra cosas. Sigue con tu vida. Cripto, stablecoins y tu dinero del día a día. Dile a tu agente lo que necesitas.

## Tu dinero. Tú decides.

### Tu propia wallet

Guarda cripto y stablecoins en una wallet de autocustodia. Conecta la cuenta que controlas.

### Una tarjeta para tu agente

Emite una Visa, consulta la actividad, fija límites de gasto y congélala desde una conversación.

### También cuentas bancarias

IBAN en euros y SEPA, con ACH en dólares donde esté disponible. Depende de tu residencia y verificación.

### Permisos, no un cheque en blanco

Elige límites y permisos. Revisa los detalles antes de autorizar acceso o un pago.

### Dinero sin fronteras

Comprueba rutas disponibles, comisiones y cuánto recibe la otra persona antes de confirmar.

### Paga servicios útiles

Paga por uso en servicios compatibles, dentro de los límites que fijes para tu agente.

## ¿Qué quieres resolver?

Una frase, no otra app. Son tareas de ejemplo: tu agente necesita servicios conectados, acceso a tus cuentas y autorización para pagar.

### Dos entradas. Buenos sitios.

Reserva dos entradas de cine para el viernes por la noche. Busca asientos juntos y pregúntame antes de pagar.

### Envía dinero a casa.

Ayúdame a enviar dinero a mi esposa en Tanzania. Comprueba opciones de cobro, comisión e importe que recibe antes de mi aprobación.

### Encuentra el vuelo. Resérvalo.

Busca vuelos para mi próximo viaje, compara el precio total con equipaje y reserva mi elección después de mi aprobación.

### Justo lo que necesitas.

Busca un protector de pantalla para mi iPhone SE. Pregunta qué generación tengo, comprueba compatibilidad y entrega y muéstrame el total antes de comprar.

### Una postal de verdad para mamá.

Ayúdame a imprimir y enviar una postal a mi madre. Pide la foto, el mensaje y la dirección postal, y enséñame el precio.

### Tú, contando un chiste.

Con mi propio rostro y voz, ayúdame a crear un vídeo divertido con un avatar contando un chiste para Instagram. Pide mi consentimiento y grabaciones; déjame revisarlo antes de publicar.

## Dale un banco a tu agente.

Una URL conecta las herramientas de pago. Sin clave API de integración ni otro panel que aprender.

Conecta mi agente a https://wirex.nuri.com/mcp con su cliente HTTP MCP nativo. No hace falta una clave API para descubrir herramientas. Inicializa el servidor, lee las instrucciones y carga las herramientas actuales, sin asumir acciones almacenadas. Dime el entorno y la disponibilidad. Cuando decida conectar, llama a connect_wallet, abre su enlace seguro exacto y mantén la sesión privada. Sigue los pasos devueltos, pide solo los datos que falten y conserva las referencias de pago en reintentos. No afirmes que un pago o compra se completó sin un resultado. Ayúdame a empezar en español.

```sh
hermes mcp add payments --url https://wirex.nuri.com/mcp
hermes mcp test payments
```

## Lo que conviene saber.

### ¿Necesito entender cripto?

No. Pregunta como hablarías normalmente. Tu agente debe explicar importe, comisiones y autorización. Puede ser necesario configurar una wallet y verificar tu identidad.

### ¿Todo es autocustodia?

La wallet es de autocustodia. Las tarjetas, saldos fiat y transferencias dependen de proveedores financieros con sus propias condiciones. La autocustodia no impide restricciones sobre saldos bancarios o de tarjetas.

### ¿Puedo empezar en Telegram o WhatsApp?

Ese es el objetivo, junto con iMessage, Signal y email. Esta vista previa aún no tiene enlaces públicos verificados para esos canales. Puedes probar el chat web o conectar tu agente por MCP.

### ¿Ya puede hacer todos los ejemplos?

No solo con el MCP de pagos. Las compras y reservas necesitan un agente con navegador, tus cuentas de comercio y servicios compatibles. Los pagos a Tanzania y avatares necesitan proveedores verificados. Son ideas de tareas, no confirmaciones de compra.

### ¿Qué funciona en esta vista previa?

El chat web descubre el MCP de Wirex y utiliza sus herramientas actuales. El entorno es un sandbox. Una herramienta disponible no demuestra una compra real, un envío de dinero ni un KYC completo. El agente debe comprobarlo antes de actuar.

## Links

- [MCP integration](https://paymentrequired.com/v2/integration.md)
- [Capabilities](https://paymentrequired.com/v2/capabilities.json)
- [Live MCP](https://wirex.nuri.com/mcp)
- [Web page](https://paymentrequired.com/v2/es/)
