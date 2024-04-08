export default class CookieService {
  static getCookie(name: string): string | undefined {
    const match: RegExpMatchArray | null = document?.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
    if (match) return match[2]
  }

  static setCookie(name: string, value: string, days: number = 7): void {
    if (!document) return
    const date: Date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/'
  }

  static deleteCookie(name: string): void {
    this.setCookie(name, '', -1)
  }
}
