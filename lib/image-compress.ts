export interface CompressionResult {
  file: File
  originalSize: number
  compressedSize: number
  savedPercent: number
}

export interface BatchCompressionResult {
  files: File[]
  totalOriginalSize: number
  totalCompressedSize: number
  totalSavedPercent: number
}

export async function compressImageFile(
  file: File,
  maxWidth = 1600,
  maxHeight = 1600,
  quality = 0.82
): Promise<CompressionResult> {
  if (!file.type.startsWith("image/")) {
    return {
      file,
      originalSize: file.size,
      compressedSize: file.size,
      savedPercent: 0,
    }
  }

  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const img = new Image()

      img.onload = () => {
        let width = img.width
        let height = img.height

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)
        }

        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext("2d")
        if (!ctx) {
          resolve({
            file,
            originalSize: file.size,
            compressedSize: file.size,
            savedPercent: 0,
          })
          return
        }

        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = "high"
        ctx.drawImage(img, 0, 0, width, height)

        const outputFormat = "image/webp"
        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size >= file.size) {
              resolve({
                file,
                originalSize: file.size,
                compressedSize: file.size,
                savedPercent: 0,
              })
              return
            }

            const baseName = file.name.substring(0, file.name.lastIndexOf(".")) || file.name
            const newFileName = `${baseName}.webp`
            const compressedFile = new File([blob], newFileName, {
              type: outputFormat,
              lastModified: Date.now(),
            })

            const savedPercent = Math.max(
              0,
              Math.round(((file.size - compressedFile.size) / file.size) * 100)
            )

            resolve({
              file: compressedFile,
              originalSize: file.size,
              compressedSize: compressedFile.size,
              savedPercent,
            })
          },
          outputFormat,
          quality
        )
      }

      img.onerror = () => {
        resolve({
          file,
          originalSize: file.size,
          compressedSize: file.size,
          savedPercent: 0,
        })
      }

      img.src = e.target?.result as string
    }

    reader.onerror = () => {
      resolve({
        file,
        originalSize: file.size,
        compressedSize: file.size,
        savedPercent: 0,
      })
    }

    reader.readAsDataURL(file)
  })
}

export async function compressMultipleImages(
  files: File[],
  maxWidth = 1600,
  maxHeight = 1600,
  quality = 0.82
): Promise<BatchCompressionResult> {
  const results = await Promise.all(
    files.map((file) => compressImageFile(file, maxWidth, maxHeight, quality))
  )

  const compressedFiles = results.map((r) => r.file)
  const totalOriginalSize = results.reduce((acc, r) => acc + r.originalSize, 0)
  const totalCompressedSize = results.reduce((acc, r) => acc + r.compressedSize, 0)
  const totalSavedPercent =
    totalOriginalSize > 0
      ? Math.max(
          0,
          Math.round(
            ((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100
          )
        )
      : 0

  return {
    files: compressedFiles,
    totalOriginalSize,
    totalCompressedSize,
    totalSavedPercent,
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
