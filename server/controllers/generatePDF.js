const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora incidunt ullam, laboriosam velit vero itaque. Ea fugiat minus quasi temporibus, quae facere quam cum hic modi inventore omnis non quos deserunt similique magnam quia repellendus fugit rerum aut suscipit? Quibusdam harum nulla praesentium commodi, unde, perspiciatis, porro cum necessitatibus reprehenderit dolores voluptates incidunt neque voluptatem architecto in quaerat molestiae iste dignissimos qui magni accusantium doloremque dolore? Dolorum a architecto vero veniam amet nemo tempore dolore cum aliquid, dolores in optio ad consequatur, pariatur, dicta quisquam ea nesciunt natus delectus magni eaque quidem nostrum praesentium sint. Repellendus saepe quos modi cupiditate?'

const GenerateMethod1 = (req, res) => {
    // Create a document
    const doc = new PDFDocument();

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    let pathNewFile = path.resolve(__dirname, `../../files/output${new Date().getTime()}.pdf`)
    doc.pipe(fs.createWriteStream(pathNewFile));

    // Embed a font, set the font size, and render some text
    // doc
    //     .font('fonts/PalatinoBold.ttf')
    //     .fontSize(25)
    //     .text('Some text with an embedded font!', 100, 100);

    // Add an image, constrain it to a given size, and center it vertically and horizontally
    // doc.image('path/to/image.png', {
    //     fit: [250, 300],
    //     align: 'center',
    //     valign: 'center'
    // });

    // Add another page
    doc
        .addPage()
        .fontSize(25)
        .text('Here is some vector graphics...', 100, 100);

    // Draw a triangle
    doc
        .save()
        .moveTo(100, 150)
        .lineTo(100, 250)
        .lineTo(200, 250)
        .fill('#FF3300');

    // Apply some transforms and render an SVG path with the 'even-odd' fill rule
    doc
        .scale(0.6)
        .translate(470, -380)
        .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
        .fill('red', 'even-odd')
        .restore();

    // Add some text with annotations
    doc
        .addPage()
        .fillColor('blue')
        .text('Here is a link!', 100, 100)
        .underline(100, 100, 160, 27, { color: '#0000FF' })
        .link(100, 100, 160, 27, 'http://google.com/');
    /* 
        More options
    */
    doc
        .save()
        .moveTo(100, 150)
        .lineTo(100, 250)
        .lineTo(200, 250)
        .fill('#FF3300');

    doc.circle(280, 200, 50).fill('#6600FF');

    // an SVG path
    doc
        .scale(0.6)
        .translate(470, 130)
        .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
        .fill('red', 'even-odd')
        .restore();

    // and some justified text wrapped into columns
    doc
        .text('And here is some wrapped text...', 100, 300)
        .font('Times-Roman', 13)
        .moveDown()
        .fillColor('black')
        .text(lorem, {
            width: 412,
            align: 'justify',
            indent: 30,
            columns: 2,
            height: 300,
            ellipsis: true
        });

    doc
        .addPage()
        .fontSize(40)
        .fillColor('black')
        .text('\n\nhola mundo', { align: 'center' });
    // Finalize PDF file
    doc.end();
    return res.status(202).json({
        ok: true
    });
}

module.exports = {
    GenerateMethod1
}