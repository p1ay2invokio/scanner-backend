import express, { Request, Response } from 'express'
const app = express()
import cors from 'cors'
import { AppDataSource } from './AppDataSource'
import { ProductsEntity } from './entities/products.entity'
import { LogEntity } from './entities/logs.entity'

app.use(cors())
app.use(express.json())

app.get("/api/product/:barcode", async (req: Request, res: Response) => {
    const { barcode } = req.params

    console.log(barcode)

    let product = await AppDataSource.createQueryBuilder().select(["product.Barcode AS barcode", "product.Name AS name", "product.Qty AS qty"]).from(ProductsEntity, 'product').where({ Barcode: barcode }).execute()

    console.log(product)

    if (product && product.length <= 0) {
        res.status(200).send("not found")
    } else {
        res.status(200).send(product)
    }
})


app.patch("/api/update_quantity", async (req, res) => {
    const { barcode, name, current, qty } = req.body

    console.log(barcode, qty, "Updated")
    let date = new Date().getTime()

    console.log(current, name, date)

    let updated = await AppDataSource.createQueryBuilder().update(ProductsEntity).set({ Qty: qty }).where({ Barcode: barcode }).execute()

    let logged = await AppDataSource.createQueryBuilder().insert().into(LogEntity).values({ barcode: barcode, name: name, old_qty: current, new_qty: qty, timestamp: date.toString() }).execute()

    res.status(200).send({ updated_success: true })
})

app.get("/api/logs", async (req, res) => {

    const logs = await AppDataSource.createQueryBuilder().select().from(LogEntity, 'log').orderBy('id', 'DESC').execute()

    res.status(200).send(logs)
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})