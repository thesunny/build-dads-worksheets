import { PDFDocument, StandardFonts } from "pdf-lib"
import fs from "fs-extra"

const phrases = (await fs.readFile("encouragement-summer.txt", "utf-8")).split(
  "\n"
)

function rand(max) {
  return Math.floor(Math.random() * max)
}

function getPhrase() {
  return phrases[rand(phrases.length)]
}

const rootDir = "./src"

// const dirs = await fs.readdir(rootDir)
const dirs = ["adding-doubles"]

console.log(dirs)

await Promise.all(
  dirs.map(async (subdir) => {
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create()

    const dir = `${rootDir}/${subdir}`
    const files = (await fs.readdir(dir)).sort()

    console.log(`Processing ${dir}`)
    console.log(files)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const donorPdfBytes = await fs.readFile(`${dir}/${file}`)
      const donorPdfDoc = await PDFDocument.load(donorPdfBytes)
      const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [0])
      const phrase = getPhrase()
      const DOUBLES_POS = { x: 70, y: 60 }
      // const DADS_POS = { x: 50, y: 30 }
      donorPage.drawText(phrase, {
        size: 12,
        ...DOUBLES_POS,
      })
      pdfDoc.addPage(donorPage)
    }

    const pdfBytes = await pdfDoc.save()

    await fs.outputFile(`./output/${subdir}.pdf`, pdfBytes)
  })
)
