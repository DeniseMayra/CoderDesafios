import {mysqlContainer} from './mysqlContainer.js';
import {sqlClient} from './mysqlClient.js';


export const productContainer = new mysqlContainer(sqlClient, 'productos')
productContainer.createTable( tabla => {
                                        tabla.string('id'),
                                        tabla.integer('price'),
                                        tabla.string('thumbnail')
                                        tabla.string('title')
                                    })
export const chatContainer = new mysqlContainer(sqlClient, 'chat')
chatContainer.createTable( tabla => {
                                        tabla.string('id'),
                                        tabla.string('email'),
                                        tabla.string('mssg'),
                                        tabla.string('date')
                                    })