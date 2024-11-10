import { Arima, Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["400"]
})
const arima = Arima({
    subsets : ['vietnamese'],
    variable: "--font-sans"
})
export {poppins, arima}