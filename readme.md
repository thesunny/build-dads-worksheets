# Read Me

## Getting Started

Place a subdirectory filled with PDF files into the `./src` directory.

Each subdirectory will be converted into one PDF file which will be placed in the `./output` directory.

The PDF file includes only the first page of every file from the subdirectory. In a Dad's Worksheet, that is the question page. The second page is always the answer page.

This makes it easy to print a bunch of question pages in a certain range of questions without having to open and print each page individually.

To run the script enter...

```sh
yarn build
```
