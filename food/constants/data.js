import {icons} from "./index";
export const InitalData = [
    {
        id: 1,
        title: "Search Restaurants",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly use" +
                "d to demonstrate the visual form of a document or ",
        icon: icons.startIconOne
    }, {
        id: 2,
        title: "Choose favorite dishes!",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly use" +
                "d to demonstrate the visual form of a document or ",
        icon: icons.startIconTwo
    }, {
        id: 3,
        title: "Get your food  ",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly use" +
                "d to demonstrate the visual form of a document or ",
        icon: icons.startIconThree
    }

];

//  https://picsum.photos/id/237/200/300'
export const foodItems = [
    {
        id: 1,
        name: 'Margherita Pizza',
        description: 'Classic margherita pizza with fresh tomatoes, mozzarella cheese, and basil.',
        img: 'https://picsum.photos/id/55/200/300',
        price: 8.99,
        weight: '500g',
        category: 'Pizza'
    }, {
        id: 2,
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan cheese.',
        img: 'https://picsum.photos/id/49/200/300',
        price: 6.99,
        weight: '300g',
        category: 'Salad'
    }, {
        id: 3,
        name: 'Beef Burger',
        description: 'Juicy beef patty with lettuce, tomato, cheese, and special sauce in a sesame bun' +
                '.',
        img: 'https://picsum.photos/id/12/200/300',
        price: 10.99,
        weight: '400g',
        category: 'Burger'
    }, {
        id: 4,
        name: 'Chicken Tacos',
        description: 'Soft tacos filled with grilled chicken, lettuce, cheese, and salsa.',
        img: 'https://picsum.photos/id/22/200/300',
        price: 7.99,
        weight: '350g',
        category: 'Mexican'
    }, {
        id: 5,
        name: 'Spaghetti Carbonara',
        description: 'Spaghetti with creamy  saucey carbonara saucey carbonara saucey carbonara saucey carbonara saucey carbonara sauce, bacon, and parmesan cheese.',
        img: 'https://picsum.photos/id/43/200/300',
        price: 12.99,
        weight: '600g',
        category: 'Pasta'
    }, {
        id: 6,
        name: 'Sushi Platter',
        description: 'An assortment of fresh sushi including nigiri, sashimi, and rolls.uding nigiri, sashimi, and rolls.uding nigiri, sashimi, and rolls.',
        img: 'https://picsum.photos/id/54/200/300',
        price: 24.99,
        weight: '800g',
        category: 'Sushi'
    }
];

export const Orders = [
    {
      orderId: "ORD-001",
      location: "123 Main St, Anytown, USA",
      total: 42.99,
      orderedBy: "John Smith",
      paymentStatus: "Paid",
      items: [
        { name: "Burger", quantity: 2, price: 9.99 },
        { name: "Fries", quantity: 1, price: 3.99 },
        { name: "Soda", quantity: 2, price: 1.99 }
      ]
    },
    {
      orderId: "ORD-002",
      location: "456 Elm St, Somewhere, USA",
      total: 55.97,
      orderedBy: "Jane Doe",
      paymentStatus: "Pending",
      items: [
        { name: "Pizza", quantity: 1, price: 14.99 },
        { name: "Salad", quantity: 1, price: 7.99 },
        { name: "Breadsticks", quantity: 1, price: 4.99 },
        { name: "Ice Cream", quantity: 2, price: 3.99 }
      ]
    },
    {
      orderId: "ORD-003",
      location: "789 Oak Rd, Elsewhere, USA",
      total: 32.97,
      orderedBy: "Bob Johnson",
      paymentStatus: "Paid",
      items: [
        { name: "Chicken Wings", quantity: 1, price: 11.99 },
        { name: "Onion Rings", quantity: 1, price: 5.99 },
        { name: "Milkshake", quantity: 1, price: 4.99 }
      ]
    },
    {
      orderId: "ORD-004",
      location: "101 Pine Ave, Nowhere, USA",
      total: 67.95,
      orderedBy: "Alice Brown",
      paymentStatus: "Paid",
      items: [
        { name: "Steak", quantity: 1, price: 24.99 },
        { name: "Baked Potato", quantity: 1, price: 3.99 },
        { name: "Caesar Salad", quantity: 1, price: 8.99 },
        { name: "Wine", quantity: 1, price: 19.99 }
      ]
    },
    {
      orderId: "ORD-005",
      location: "202 Maple Ln, Anyville, USA",
      total: 28.96,
      orderedBy: "Charlie Davis",
      paymentStatus: "Pending",
      items: [
        { name: "Tacos", quantity: 3, price: 2.99 },
        { name: "Nachos", quantity: 1, price: 7.99 },
        { name: "Guacamole", quantity: 1, price: 3.99 },
        { name: "Horchata", quantity: 2, price: 1.99 }
      ]
    }
  ];

  export const OrdersToDeliver = [
    {
      orderId: "ORD-001",
      location: "123 Main St, Anytown, USA",
      total: 42.99,
      orderedBy: "John Smith",
      paymentStatus: "Paid",
      items: [
        { name: "Burger", quantity: 2, price: 9.99 },
        { name: "Fries", quantity: 1, price: 3.99 },
        { name: "Soda", quantity: 2, price: 1.99 }
      ],
      // Added attributes
      customerPhone: "+1 (555) 123-4567",
      deliveryInstructions: "Leave at the door",
      estimatedDeliveryTime: "2023-07-23T18:30:00Z",
      deliveryStatus: "Preparing",
      deliveryPartner: "FastDelivery Inc.",
      restaurantName: "Burger Palace",
      restaurantPhone: "+1 (555) 987-6543"
    },
    {
      orderId: "ORD-002",
      location: "456 Elm St, Somewhere, USA",
      total: 55.97,
      orderedBy: "Jane Doe",
      paymentStatus: "Pending",
      items: [
        { name: "Pizza", quantity: 1, price: 14.99 },
        { name: "Salad", quantity: 1, price: 7.99 },
        { name: "Breadsticks", quantity: 1, price: 4.99 },
        { name: "Ice Cream", quantity: 2, price: 3.99 }
      ],
      // Added attributes
      customerPhone: "+1 (555) 234-5678",
      deliveryInstructions: "Call upon arrival",
      estimatedDeliveryTime: "2023-07-23T19:00:00Z",
      deliveryStatus: "Assigned",
      deliveryPartner: "QuickRush Delivery",
      restaurantName: "Pizza Heaven",
      restaurantPhone: "+1 (555) 876-5432"
    },
    {
      orderId: "ORD-003",
      location: "789 Oak Rd, Elsewhere, USA",
      total: 32.97,
      orderedBy: "Bob Johnson",
      paymentStatus: "Paid",
      items: [
        { name: "Chicken Wings", quantity: 1, price: 11.99 },
        { name: "Onion Rings", quantity: 1, price: 5.99 },
        { name: "Milkshake", quantity: 1, price: 4.99 }
      ],
      // Added attributes
      customerPhone: "+1 (555) 345-6789",
      deliveryInstructions: "Apartment 3B, buzz 302",
      estimatedDeliveryTime: "2023-07-23T18:45:00Z",
      deliveryStatus: "En Route",
      deliveryPartner: "SpeedyEats",
      restaurantName: "Wing Zone",
      restaurantPhone: "+1 (555) 765-4321"
    },
    {
      orderId: "ORD-004",
      location: "101 Pine Ave, Nowhere, USA",
      total: 67.95,
      orderedBy: "Alice Brown",
      paymentStatus: "Paid",
      items: [
        { name: "Steak", quantity: 1, price: 24.99 },
        { name: "Baked Potato", quantity: 1, price: 3.99 },
        { name: "Caesar Salad", quantity: 1, price: 8.99 },
        { name: "Wine", quantity: 1, price: 19.99 }
      ],
      // Added attributes
      customerPhone: "+1 (555) 456-7890",
      deliveryInstructions: "Gate code: 1234",
      estimatedDeliveryTime: "2023-07-23T19:15:00Z",
      deliveryStatus: "Preparing",
      deliveryPartner: "LuxeDelivery",
      restaurantName: "Steak House Deluxe",
      restaurantPhone: "+1 (555) 654-3210"
    },
    {
      orderId: "ORD-005",
      location: "202 Maple Ln, Anyville, USA",
      total: 28.96,
      orderedBy: "Charlie Davis",
      paymentStatus: "Pending",
      items: [
        { name: "Tacos", quantity: 3, price: 2.99 },
        { name: "Nachos", quantity: 1, price: 7.99 },
        { name: "Guacamole", quantity: 1, price: 3.99 },
        { name: "Horchata", quantity: 2, price: 1.99 }
      ],
      // Added attributes
      customerPhone: "+1 (555) 567-8901",
      deliveryInstructions: "Please knock, doorbell not working",
      estimatedDeliveryTime: "2023-07-23T18:50:00Z",
      deliveryStatus: "Assigned",
      deliveryPartner: "TacoExpress",
      restaurantName: "Taco Fiesta",
      restaurantPhone: "+1 (555) 543-2109"
    }
  ]; 