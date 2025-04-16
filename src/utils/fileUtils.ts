import epubFile from '@/assets/imgs/file-epub.png'
import markdownFile from '@/assets/imgs/file-markdown.png'
import mobiFile from '@/assets/imgs/file-mobi.png'
import pdfFile from '@/assets/imgs/file-pdf.png'
import txtFile from '@/assets/imgs/file-txt.png'
import wordFile from '@/assets/imgs/file-word.png'
import excelFile from '@/assets/imgs/file-excel.png'
import pngFile from '@/assets/imgs/file-png.png'
import jpgFile from '@/assets/imgs/file-jpg.png'

export const validTypes = {
  'application/msword': 'DOC',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
  'application/pdf': 'PDF',
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
  'application/vnd.ms-excel': 'XLS',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
  'text/plain': 'TXT',
  'text/markdown': 'MARKDOWN'
}

export const validExtensionsMap = {
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/pdf': '.pdf',
  'text/plain': '.txt',
  'text/markdown': '.md'
}

// export const validExtensionsMap = {
//   'application/msword': '.doc',
//   'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
//   'application/pdf': '.pdf',
//   'image/jpeg': '.jpg',
//   'image/png': '.png',
//   'application/vnd.ms-excel': '.xls',
//   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx'
// }

export const getFileIcon = (fileType: string) => {
  const icons = {
    EPUB: epubFile,
    MARKDOWN: markdownFile,
    MOBI: mobiFile,
    PDF: pdfFile,
    TXT: txtFile,
    DOC: wordFile,
    DOCX: wordFile,
    XLS: excelFile,
    XLSX: excelFile,
    PNG: pngFile,
    JPG: jpgFile
  }
  return icons[fileType] || ''
}

export const formatFileSize = (fileSize: number) => {
  if (fileSize >= 1024 * 1024) {
    const sizeInMB = fileSize / (1024 * 1024)
    return `${sizeInMB.toFixed(2)} MB`
  } else if (fileSize >= 1024) {
    const sizeInKB = fileSize / 1024
    return `${sizeInKB.toFixed(2)} KB`
  } else {
    return `${fileSize} B`
  }
}
