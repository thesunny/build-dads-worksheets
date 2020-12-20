import { PDFDocument } from "pdf-lib"
import fs from "fs-extra"

const rootDir = "./src"

const dirs = await fs.readdir(rootDir)

console.log(dirs)

await Promise.all(
  dirs.map(async (subdir) => {
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create()

    const dir = `${rootDir}/${subdir}`
    const files = await fs.readdir(dir)

    console.log(`Processing ${dir}`)

    await Promise.all(
      files.map(async (file) => {
        const donorPdfBytes = await fs.readFile(`${dir}/${file}`)
        const donorPdfDoc = await PDFDocument.load(donorPdfBytes)
        const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [0])
        pdfDoc.addPage(donorPage)
      })
    )

    const pdfBytes = await pdfDoc.save()

    await fs.outputFile(`./output/${subdir}.pdf`, pdfBytes)
  })
)
