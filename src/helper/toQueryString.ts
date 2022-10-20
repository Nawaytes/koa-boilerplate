interface ObjectableQueryString {
    [key: string]: string | number
}
export function toQueryString(
    url: string,
    data: ObjectableQueryString
): string {
    const dataStringified = Object.keys(data)
        .map((key) => `${key}=${data[key]}`)
        .join('&')

    return `${url}?${dataStringified}`
}
