import 'reflect-metadata';
import {Request, Response} from "express";
import axios, { AxiosInstance } from 'axios';
import { AppDataSource } from "./app"
import { Inventory }  from "./entity/Inventory"
import { Order } from './entity/Order';

export const getInventory = async (req: Request, res: Response) => {
  try{
    const products = await AppDataSource.manager.find(Inventory);
    res.send(products)
  }catch(error){
    const message = "Error fetching inventory: " + error;
    console.log(message);
    res.send(message)
  }
}

export const  createOrder = async (req: Request, res: Response) => {
  const order = new Order()
  order.details = new Date().toTimeString();
  var message = "";

  try{
    await AppDataSource.manager.save(order)
    message = "Order Placed!";
  }catch(error){
    message = "Error saving order: " + error;
  }

  try{
    const count = await AppDataSource.manager.count(Order);
    message += " Number of orders: " + count;
  }catch(error){
    message += " Error fetching order count: " + error;
  }

  const inventoryServiceUrl = process.env["INVENTORY_SERVICE_URL"]
  if (!inventoryServiceUrl) {
    message += " Error: INVENTORY_SERVICE_URL not defined";
    console.log("INVENTORY_SERVICE_URL not defined")
  }else{
    try{
      await axios.get(inventoryServiceUrl);
    }catch(error){
      message += " Error: " + inventoryServiceUrl + " connection error";
      console.log(message);
    }
  };

  const trackOrderFunctionUrl = process.env["TRACK_ORDER_URL"]
  if (!trackOrderFunctionUrl) {
    message += " Error: TRACK_ORDER_URL not defined";
    console.log("TRACK_ORDER_URL not defined")
  }else{
    try{
      await axios.get(trackOrderFunctionUrl);
    }catch(error){
      message += " Error: " + trackOrderFunctionUrl + " connection error";
      console.log(message);
    }
  };

  res.send(message);
}

export const logUserIn = (req: Request, res: Response) => {
  res.send("User Logged in")
}

export const check = (req: Request, res: Response) => {
    res.send("Ping Pong!?")
}