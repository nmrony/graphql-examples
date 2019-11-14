import fetch from 'node-fetch'
import { parseString } from 'xml2js'
import { promisify } from 'util'

const parseXML = promisify(parseString)
const API_URL = `https://www.goodreads.com/author/show.xml?key=yqR7XuIH2YfDqexvY6LZw&id=`

export default function fetchInfo(authorId) {
  return fetch(`${API_URL}${authorId}`)
    .then(response => response.text())
    .then(parseXML).catch(console.log)
}
