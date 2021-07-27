let order = {
  customer : {
    first_name : "",
    last_name : ""
  },
  pizza :[ 
    {pizza_type : "Select pizza type"},
    {pizza_size : "Select pizza size"},
    {count: "Select pizza count"}
  ]
}
var checked_result;

const createOrder=async(event)=>{
  event.preventDefault()
  alert("Added to Cart. Go to View Cart to review and place order")

  let pizzaCountCheese = document.getElementById("quantityCheese").value
  let pizzaCountPepperoni = document.getElementById("quantityPepperoni").value
  let pizzaCountChicken = document.getElementById("quantityChicken").value
  
  
  if(pizzaCountCheese>0){
    order.pizza[0].pizza_type="Cheese"
    order.pizza[0].pizza_size= document.getElementById("sizeCheese").value
    order.pizza[0].count=pizzaCountCheese
    
    cartTable = document.getElementById("cart_table")
  
  let row = cartTable.insertRow(1)

  let cell1 = row.insertCell(0)
  cell1.innerHTML = order.pizza[0].pizza_type

  let cell2 = row.insertCell(1)
  cell2.innerHTML = order.pizza[0].pizza_size

  let cell3 = row.insertCell(2)
  cell3.innerHTML=order.pizza[0].count
  }
  if(pizzaCountPepperoni>0){
    order.pizza[1].pizza_type="Pepperoni"
    order.pizza[1].pizza_size= document.getElementById("sizePepperoni").value
    order.pizza[1].count=pizzaCountPepperoni
    
    cartTable = document.getElementById("cart_table")

  let row = cartTable.insertRow(1)

  let cell1 = row.insertCell(0)
  cell1.innerHTML = order.pizza[1].pizza_type

  let cell2 = row.insertCell(1)
  cell2.innerHTML = order.pizza[1].pizza_size

  let cell3 = row.insertCell(2)
  cell3.innerHTML=order.pizza[1].count
  }
  if(pizzaCountChicken>0){
    order.pizza[2].pizza_type="Chicken"
    order.pizza[2].pizza_size= document.getElementById("sizeChicken").value
    order.pizza[2].count=pizzaCountChicken
    cartTable = document.getElementById("cart_table")
  

  let row = cartTable.insertRow(1)

  let cell1 = row.insertCell(0)
  cell1.innerHTML = order.pizza[2].pizza_type

  let cell2 = row.insertCell(1)
  cell2.innerHTML = order.pizza[2].pizza_size

  let cell3 = row.insertCell(2)
  cell3.innerHTML=order.pizza[2].count
  }
 
}


const render_everything=async(event)=>{
  event.preventDefault()
  alert("Order has been placed.")
  let firstName = document.getElementById("firstNameInput").value
  let lastName = document.getElementById("lastNameInput").value
  order.customer.first_name=firstName
  order.customer.last_name=lastName
  
  document.getElementById("confirmation").innerHTML = "Customer name " +
  order.customer.first_name + " " + order.customer.last_name

  
  orderTable=document.getElementById("ordersTable")
  let row = orderTable.insertRow(0)
  let cell1= row.insertCell(0)
  let cell2= row.insertCell(1)
  let cell3= row.insertCell(2)
  cell1.innerHTML="Type"
  cell2.innerHTML="Size"
  cell3.innerHTML="Count"
  for (x in order.pizza){
    if(order.pizza[x].count>0){
    let row = orderTable.insertRow(1)
    let cell1=row.insertCell(0)
    let cell2= row.insertCell(1)
    let cell3= row.insertCell(2)
    cell1.innerHTML=order.pizza[x].pizza_type
    cell2.innerHTML=order.pizza[x].pizza_size
    cell3.innerHTML=order.pizza[x].count
  }
  else
  continue
}
document.getElementById("rawJson").innerHTML = "<pre>" + JSON.stringify(order, null, " ") + "</pre>"
  let response = await (fetch("submit_order_as_json", {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(order)
    }))
    
    let result = await response.json()
    display_response(result)
  }

  render_everything(order)

  
const pizza_or_pizzas=(num)=>{
  if(num==0 || num==1){
    return "pizza"
  }
  else{
    return"pizzas"
  }
}
const display_response= (result)=>{
  document.getElementById("customer").innerHTML="Customer: "+ result.customer.first_name+" "+ result.customer.last_name
  document.getElementById("orderid").innerHTML="Order ID: "+ result.id
  document.getElementById("status").innerHTML="Status: "+ result.status
  document.getElementById("details").innerHTML="Order details: "
  document.getElementById("chicken").innerHTML="1. "+ result.pizza[0].count+" " + result.pizza[0].pizza_size+" " + result.pizza[0].pizza_type+" " +pizza_or_pizzas(result.pizza[0].count)
  document.getElementById("pepperoni").innerHTML="2. "+ result.pizza[1].count+" " + result.pizza[1].pizza_size+" " + result.pizza[1].pizza_type+" " +pizza_or_pizzas(result.pizza[1].count)
  document.getElementById("cheese").innerHTML="3. "+result.pizza[2].count+" " + result.pizza[2].pizza_size+" " + result.pizza[2].pizza_type+" " +pizza_or_pizzas(result.pizza[2].count)
}



document.querySelector("#submitCart").addEventListener("click", createOrder)
document.querySelector("#submitButton").addEventListener("click", render_everything)
document.querySelector("#check_order").addEventListener("click", check_order)  