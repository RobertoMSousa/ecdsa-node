export const signatureSanitizer = (signature) => {
    return signature.replace(/(\w+):/g, '"$1":').replace(/(\d+)n/g, '"$1"');;
}