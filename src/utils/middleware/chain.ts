import {
  NextMiddleware,
  NextRequest,
  NextFetchEvent,
  NextResponse,
} from "next/server";

export default function chain(...functions: NextMiddleware[]) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    for (let current of functions) {
      const currentValue = await current(request, event)
      if (currentValue) {
        return currentValue
      }
    }
    return NextResponse.next()
  }
}