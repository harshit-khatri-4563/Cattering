// app/menu/page.tsx
'use client'; 

import { useState, Suspense } from 'react'; 
import MenuItem from '@/components/MenuItem';
import styles from './MenuPage.module.css'; 

// --- UPDATED DUMMY DATA ---
// All 10 categories now have exactly 21 items.

const menuData = [
  // 1. Drinks (21 items)
  {
    mainCategory: 'Drinks',
    items: [
      { id: 'd1', name: 'Masala Chai', description: 'Traditional spiced Indian tea.', imageUrl: 'https://placehold.co/300x200/c0392b/white?text=Drinks' },
      { id: 'd2', name: 'Filter Coffee', description: 'South Indian style filter coffee.', imageUrl: 'https://placehold.co/300x200/c0392b/white?text=Drinks' },
      { id: 'd3', name: 'Ginger Tea', description: 'Refreshing tea with ginger.', imageUrl: 'https://placehold.co/300x200/c0392b/white?text=Drinks' },
      { id: 'd4', name: 'Cappuccino', description: 'Espresso with steamed milk foam.', imageUrl: 'https://placehold.co/300x200/c0392b/white?text=Drinks' },
      { id: 'd5', name: 'Green Tea', description: 'Light and healthy green tea.', imageUrl: 'https://placehold.co/300x200/c0392b/white?text=Drinks' },
      { id: 'd6', name: 'Mango Lassi', description: 'Cooling yogurt shake with mango.', imageUrl: 'https://placehold.co/300x200/c0392b/white?text=Drinks' },
      { id: 'd7', name: 'Sweet Lassi', description: 'Sweetened yogurt drink.', imageUrl: 'https://placehold.co/300x200/c0392b/white?text=Drinks' },
      { id: 'd8', name: 'Salted Lassi (Chaas)', description: 'Spiced buttermilk.', imageUrl: 'https://placehold.co/300x200/c0392b/white?text=Drinks' },
      { id: 'd9', name: 'Oreo Shake', description: 'Classic cookie and cream shake.', imageUrl: 'https://placehold.co/300x200/c0392b/white?text=Drinks' },
      { id: 'd10', name: 'Banana Shake', description: 'Healthy banana and milk shake.', imageUrl: 'https://placehold.co/300x200/c0392b/white?text=Drinks' },
      { id: 'd11', name: 'Virgin Mojito', description: 'A refreshing mint and lime cooler.', imageUrl: 'https://placehold.co/300x200/c0392b/white?text=Drinks' },
      { id: 'd12', name: 'Blue Lagoon', description: 'A sparkling blue citrus drink.', imageUrl: 'https://placehold.co/300x200/c0392b/white?text=Drinks' },
      { id: 'd13', name: 'Shirley Temple', description: 'Ginger ale and grenadine.', imageUrl: 'https://placehold.co/300x200/c0392b/white?text=Drinks' },
      { id: 'd14', name: 'Cinderella', description: 'A fruity mix of juices.', imageUrl: 'https://placehold.co/300x200/c0392b/white?text=Drinks' },
      { id: 'd15', name: 'Watermelon Cooler', description: 'Fresh watermelon and mint.', imageUrl: 'https://placehold.co/300x200/c0392b/white?text=Drinks' },
      { id: 'd16', name: 'Fresh Lime Soda', description: 'Sweet or salty, your choice.', imageUrl: 'https://placehold.co/300x200/c0392b/white?text=Drinks' },
      { id: 'd17', name: 'Orange Juice', description: 'Freshly squeezed orange juice.', imageUrl: 'https://placehold.co/300x200/c0392b/white?text=Drinks' },
      { id: 'd18', name: 'Mixed Fruit Juice', description: 'Seasonal fruit blend.', imageUrl: 'https://placehold.co/300x200/c0392b/white?text=Drinks' },
      { id: 'd19', name: 'Coke/Pepsi', description: 'Standard aerated drinks.', imageUrl: 'https://placehold.co/300x200/c0392b/white?text=Drinks' },
      { id: 'd20', name: 'Mineral Water', description: 'Packaged drinking water.', imageUrl: 'https://placehold.co/300x200/c0392b/white?text=Drinks' },
      { id: 'd21', name: 'Shikanji', description: 'Traditional spiced lemonade.', imageUrl: 'https://placehold.co/300x200/c0392b/white?text=Drinks' },
    ]
  },
  
  // 2. Snacks (21 items)
  {
    mainCategory: 'Snacks',
    items: [
      { id: 's1', name: 'Paneer Tikka', description: 'Marinated cheese cubes grilled.', imageUrl: 'https://placehold.co/300x200/e67e22/white?text=Snacks' },
      { id: 's2', name: 'Hara Bhara Kebab', description: 'Spinach and pea patties.', imageUrl: 'https://placehold.co/300x200/e67e22/white?text=Snacks' },
      { id: 's3', name: 'Mushroom Tikka', description: 'Grilled marinated mushrooms.', imageUrl: 'https://placehold.co/300x200/e67e22/white?text=Snacks' },
      { id: 's4', name: 'Tandoori Aloo', description: 'Spiced potatoes from the tandoor.', imageUrl: 'https://placehold.co/300x200/e67e22/white?text=Snacks' },
      { id: 's5', name: 'Dahi Ke Kebab', description: 'Yogurt and spice patties, fried.', imageUrl: 'https://placehold.co/300x200/e67e22/white?text=Snacks' },
      { id: 's6', name: 'Samosa', description: 'Crispy pastry with spiced potatoes.', imageUrl: 'https://placehold.co/300x200/e67e22/white?text=Snacks' },
      { id: 's7', name: 'Spring Roll', description: 'Fried rolls with vegetable filling.', imageUrl: 'https://placehold.co/300x200/e67e22/white?text=Snacks' },
      { id: 's8', name: 'Chilli Paneer (Dry)', description: 'Spicy Indo-Chinese paneer.', imageUrl: 'https://placehold.co/300x200/e67e22/white?text=Snacks' },
      { id: 's9', name: 'Veg Manchurian (Dry)', description: 'Fried vegetable balls.', imageUrl: 'https://placehold.co/300x200/e67e22/white?text=Snacks' },
      { id: 's10', name: 'Assorted Pakoras', description: 'Mixed vegetable fritters.', imageUrl: 'https://placehold.co/300x200/e67e22/white?text=Snacks' },
      { id: 's11', name: 'Chicken Tikka', description: 'Classic grilled chicken chunks.', imageUrl: 'https://placehold.co/300x200/e67e22/white?text=Snacks' },
      { id: 's12', name: 'Tandoori Chicken', description: 'Spiced chicken, grilled whole.', imageUrl: 'https://placehold.co/300x200/e67e22/white?text=Snacks' },
      { id: 's13', name: 'Fish Amritsari', description: 'Spiced battered fried fish.', imageUrl: 'https://placehold.co/300x200/e67e22/white?text=Snacks' },
      { id: 's14', name: 'Mutton Seekh Kebab', description: 'Minced mutton on skewers.', imageUrl: 'https://placehold.co/300x200/e67e22/white?text=Snacks' },
      { id: 's15', name: 'Chilli Chicken (Dry)', description: 'Spicy Indo-Chinese chicken.', imageUrl: 'https://placehold.co/300x200/e67e22/white?text=Snacks' },
      { id: 's16', name: 'Papdi Chaat', description: 'Crispy wafers with toppings.', imageUrl: 'https://placehold.co/300x200/e67e22/white?text=Snacks' },
      { id: 's17', name: 'Dahi Bhalla', description: 'Lentil dumplings in yogurt.', imageUrl: 'https://placehold.co/300x200/e67e22/white?text=Snacks' },
      { id: 's18', name: 'Aloo Tikki Chaat', description: 'Potato patties with toppings.', imageUrl: 'https://placehold.co/300x200/e67e22/white?text=Snacks' },
      { id: 's19', name: 'Golgappe (Pani Puri)', description: 'Hollow puri with spiced water.', imageUrl: 'https://placehold.co/300x200/e67e22/white?text=Snacks' },
      { id: 's20', name: 'Khandvi', description: 'Gujarati gram flour rolls.', imageUrl: 'https://placehold.co/300x200/e67e22/white?text=Snacks' },
      { id: 's21', name: 'Corn Cheese Balls', description: 'Fried balls of corn and cheese.', imageUrl: 'https://placehold.co/300x200/e67e22/white?text=Snacks' },
    ]
  },
  
  // 3. Live Counters (21 items)
  {
    mainCategory: 'Live Counters',
    items: [
      { id: 'l1', name: 'Live Chaat Counter', description: 'Live Papdi Chaat, Dahi Bhalla.', imageUrl: 'https://placehold.co/300x200/f1c40f/white?text=Live' },
      { id: 'l2', name: 'Pani Puri / Golgappe', description: 'Assorted flavored water.', imageUrl: 'https://placehold.co/300x200/f1c40f/white?text=Live' },
      { id: 'l3', name: 'Aloo Tikki & Chole', description: 'Hot potato patties with chickpea curry.', imageUrl: 'https://placehold.co/300x200/f1c40f/white?text=Live' },
      { id: 'l4', name: 'Pav Bhaji Counter', description: 'Hot mashed vegetables with buns.', imageUrl: 'https://placehold.co/300x200/f1c40f/white?text=Live' },
      { id: 'l5', name: 'Live Jalebi & Rabri', description: 'Hot, fresh jalebis.', imageUrl: 'https://placehold.co/300x200/f1c40f/white?text=Live' },
      { id: 'l6', name: 'Live Pasta Station', description: 'Choice of pasta and sauces.', imageUrl: 'https://placehold.co/300x200/f1c40f/white?text=Live' },
      { id: 'l7', name: 'Mongolian Stir-Fry', description: 'Veggies and noodles stir-fried live.', imageUrl: 'https://placehold.co/300x200/f1c40f/white?text=Live' },
      { id: 'l8', name: 'Mexican (Taco/Nacho) Bar', description: 'Live tacos and nacho bar.', imageUrl: 'https://placehold.co/300x200/f1c40f/white?text=Live' },
      { id: 'l9', name: 'Live Sushi Bar', description: 'Assorted veg and non-veg sushi.', imageUrl: 'https://placehold.co/300x200/f1c40f/white?text=Live' },
      { id: 'l10', name: 'Wood-Fired Pizza', description: 'Freshly baked thin-crust pizza.', imageUrl: 'https://placehold.co/300x200/f1c40f/white?text=Live' },
      { id: 'l11', name: 'Live Tandoor Station', description: 'Paneer, chicken, kebabs made fresh.', imageUrl: 'https://placehold.co/300x200/f1c40f/white?text=Live' },
      { id: 'l12', name: 'Live Dosa Counter', description: 'Hot and crispy dosas with fillings.', imageUrl: 'https://placehold.co/300x200/f1c40f/white?text=Live' },
      { id: 'l13', name: 'Shawarma Station', description: 'Vertical rotisserie chicken.', imageUrl: 'https://placehold.co/300x200/f1c40f/white?text=Live' },
      { id: 'l14', name: 'Appam & Stew', description: 'Soft hoppers with vegetable stew.', imageUrl: 'https://placehold.co/300x200/f1c40f/white?text=Live' },
      { id: 'l15', name: 'Live Barbeque Grill', description: 'Live grilled skewers.', imageUrl: 'https://placehold.co/300x200/f1c40f/white?text=Live' },
      { id: 'l16', name: 'Hot Gulab Jamun', description: 'Served hot with syrup.', imageUrl: 'https://placehold.co/300x200/f1c40f/white?text=Live' },
      { id: 'l17', name: 'Ice Cream Sundae Bar', description: 'Choice of ice creams and toppings.', imageUrl: 'https://placehold.co/300x200/f1c40f/white?text=Live' },
      { id: 'l18', name: 'Live Crepe Station', description: 'Sweet crepes with fillings.', imageUrl: 'https://placehold.co/300x200/f1c40f/white?text=Live' },
      { id: 'l19', name: 'Live Kulfi Counter', description: 'Traditional Indian ice cream.', imageUrl: 'https://placehold.co/300x200/f1c40f/white?text=Live' },
      { id: 'l20', name: 'Live Waffle Station', description: 'Hot waffles with syrup/chocolate.', imageUrl: 'https://placehold.co/300x200/f1c40f/white?text=Live' },
      { id: 'l21', name: 'Tawa Sabzi Counter', description: 'Vegetables cooked live on a griddle.', imageUrl: 'https://placehold.co/300x200/f1c40f/white?text=Live' },
    ]
  },

  // 4. North Indian (21 items)
  {
    mainCategory: 'North Indian',
    items: [
      { id: 'n1', name: 'Shahi Paneer', description: 'Royal paneer curry in a rich gravy.', imageUrl: 'https://placehold.co/300x200/27ae60/white?text=North+Indian' },
      { id: 'n2', name: 'Paneer Butter Masala', description: 'Paneer in a creamy tomato gravy.', imageUrl: 'https://placehold.co/300x200/27ae60/white?text=North+Indian' },
      { id: 'n3', name: 'Palak Paneer', description: 'Paneer in a spinach gravy.', imageUrl: 'https://placehold.co/300x200/27ae60/white?text=North+Indian' },
      { id: 'n4', name: 'Kadai Paneer', description: 'Paneer with peppers in a wok.', imageUrl: 'https://placehold.co/300x200/27ae60/white?text=North+Indian' },
      { id: 'n5', name: 'Paneer Tikka Masala', description: 'Grilled paneer in a spiced gravy.', imageUrl: 'https://placehold.co/300x200/27ae60/white?text=North+Indian' },
      { id: 'n6', name: 'Malai Kofta', description: 'Veg dumplings in a creamy sauce.', imageUrl: 'https://placehold.co/300x200/27ae60/white?text=North+Indian' },
      { id: 'n7', name: 'Navratan Korma', description: 'Nine-gem curry with nuts & fruits.', imageUrl: 'https://placehold.co/300x200/27ae60/white?text=North+Indian' },
      { id: 'n8', name: 'Mix Vegetable', description: 'Assorted seasonal vegetables.', imageUrl: 'https://placehold.co/300x200/27ae60/white?text=North+Indian' },
      { id: 'n9', name: 'Aloo Gobi', description: 'Classic potato and cauliflower.', imageUrl: 'https://placehold.co/300x200/27ae60/white?text=North+Indian' },
      { id: 'n10', name: 'Chana Masala', description: 'Spicy chickpea curry.', imageUrl: 'https://placehold.co/300x200/27ae60/white?text=North+Indian' },
      { id: 'n11', name: 'Butter Chicken', description: 'Classic creamy chicken curry.', imageUrl: 'https://placehold.co/300x200/27ae60/white?text=North+Indian' },
      { id: 'n12', name: 'Rogan Josh', description: 'Aromatic Kashmiri mutton curry.', imageUrl: 'https://placehold.co/300x200/27ae60/white?text=North+Indian' },
      { id: 'n13', name: 'Kadai Chicken', description: 'Chicken with peppers in a wok.', imageUrl: 'https://placehold.co/300x200/27ae60/white?text=North+Indian' },
      { id: 'n14', name: 'Chicken Korma', description: 'Rich and mild chicken curry.', imageUrl: 'https://placehold.co/300x200/27ae60/white?text=North+Indian' },
      { id: 'n15', name: 'Laal Maas', description: 'Spicy Rajasthani mutton curry.', imageUrl: 'https://placehold.co/300x200/27ae60/white?text=North+Indian' },
      { id: 'n16', name: 'Dal Makhani', description: 'Creamy black lentils.', imageUrl: 'https://placehold.co/300x200/27ae60/white?text=North+Indian' },
      { id: 'n17', name: 'Dal Tadka (Yellow)', description: 'Tempered yellow lentils.', imageUrl: 'https://placehold.co/300x200/27ae60/white?text=North+Indian' },
      { id: 'n18', name: 'Dal Bukhara', description: 'Slow-cooked whole urad dal.', imageUrl: 'https://placehold.co/300x200/27ae60/white?text=North+Indian' },
      { id: 'n19', name: 'Rajma Masala', description: 'Kidney beans in a thick gravy.', imageUrl: 'https://placehold.co/300x200/27ae60/white?text=North+Indian' },
      { id: 'n20', name: 'Panchmel Dal', description: 'A mix of five lentils (Rajasthani).', imageUrl: 'https://placehold.co/300x200/27ae60/white?text=North+Indian' },
      { id: 'n21', name: 'Mutter Paneer', description: 'Peas and paneer in a tomato gravy.', imageUrl: 'https://placehold.co/300x200/27ae60/white?text=North+Indian' },
    ]
  },

  // 5. South Indian (21 items)
  {
    mainCategory: 'South Indian',
    items: [
      { id: 'si1', name: 'Masala Dosa', description: 'Rice crepe with potato filling.', imageUrl: 'https://placehold.co/300x200/2980b9/white?text=South+Indian' },
      { id: 'si2', name: 'Idli Sambar', description: 'Steamed rice cakes with lentil soup.', imageUrl: 'https://placehold.co/300x200/2980b9/white?text=South+Indian' },
      { id: 'si3', name: 'Vada Sambar', description: 'Fried lentil donut with lentil soup.', imageUrl: 'https://placehold.co/300x200/2980b9/white?text=South+Indian' },
      { id: 'si4', name: 'Onion Uttapam', description: 'Thick pancake with onion toppings.', imageUrl: 'https://placehold.co/300x200/2980b9/white?text=South+Indian' },
      { id: 'si5', name: 'Pesarattu', description: 'Green gram crepe.', imageUrl: 'https://placehold.co/300x200/2980b9/white?text=South+Indian' },
      { id: 'si6', name: 'Bisibelebath', description: 'Spicy lentil and rice dish.', imageUrl: 'https://placehold.co/300x200/2980b9/white?text=South+Indian' },
      { id: 'si7', name: 'Lemon Rice', description: 'Tempered rice with lemon.', imageUrl: 'https://placehold.co/300x200/2980b9/white?text=South+Indian' },
      { id: 'si8', name: 'Tamarind Rice (Pulihora)', description: 'Tempered rice with tamarind.', imageUrl: 'https://placehold.co/300x200/2980b9/white?text=South+Indian' },
      { id: 'si9', name: 'Coconut Rice', description: 'Tempered rice with coconut.', imageUrl: 'https://placehold.co/300x200/2980b9/white?text=South+Indian' },
      { id: 'si10', name: 'Curd Rice', description: 'Yogurt rice with tempering.', imageUrl: 'https://placehold.co/300x200/2980b9/white?text=South+Indian' },
      { id: 'si11', name: 'Avial', description: 'Mixed vegetables in coconut gravy.', imageUrl: 'https://placehold.co/300x200/2980b9/white?text=South+Indian' },
      { id: 'si12', name: 'Sambar', description: 'Lentil and vegetable stew.', imageUrl: 'https://placehold.co/300x200/2980b9/white?text=South+Indian' },
      { id: 'si13', name: 'Rasam', description: 'Spicy and tangy soup.', imageUrl: 'https://placehold.co/300x200/2980b9/white?text=South+Indian' },
      { id: 'si14', name: 'Chettinad Chicken', description: 'Spicy chicken from Chettinad.', imageUrl: 'https://placehold.co/300x200/2980b9/white?text=South+Indian' },
      { id: 'si15', name: 'Malabar Fish Curry', description: 'Kerala style fish curry.', imageUrl: 'https://placehold.co/300x200/2980b9/white?text=South+Indian' },
      { id: 'si16', name: 'Coconut Chutney', description: 'Classic coconut side.', imageUrl: 'https://placehold.co/300x200/2980b9/white?text=South+Indian' },
      { id: 'si17', name: 'Tomato Chutney', description: 'Spicy tomato side.', imageUrl: 'https://placehold.co/300x200/2980b9/white?text=South+Indian' },
      { id: 'si18', name: 'Papadum', description: 'Fried or roasted crisps.', imageUrl: 'https://placehold.co/300x200/2980b9/white?text=South+Indian' },
      { id: 'si19', name: 'Rava Dosa', description: 'Crispy semolina crepe.', imageUrl: 'https://placehold.co/300x200/2980b9/white?text=South+Indian' },
      { id: 'si20', name: 'Poriyal', description: 'Stir-fried/steamed vegetables.', imageUrl: 'https://placehold.co/300x200/2980b9/white?text=South+Indian' },
      { id: 'si21', name: 'Rava Kesari', description: 'Sweet semolina pudding.', imageUrl: 'https://placehold.co/300x200/2980b9/white?text=South+Indian' },
    ]
  },
  
  // 6. Chinese (21 items)
  {
    mainCategory: 'Chinese',
    items: [
      { id: 'c1', name: 'Veg Manchow Soup', description: 'Spicy soup with crispy noodles.', imageUrl: 'https://placehold.co/300x200/e74c3c/white?text=Chinese' },
      { id: 'c2', name: 'Veg Hot & Sour Soup', description: 'Classic spicy and tangy soup.', imageUrl: 'https://placehold.co/300x200/e74c3c/white?text=Chinese' },
      { id: 'c3', name: 'Veg Sweet Corn Soup', description: 'Creamy sweet corn soup.', imageUrl: 'https://placehold.co/300x200/e74c3c/white?text=Chinese' },
      { id: 'c4', name: 'Chicken Hot & Sour Soup', description: 'Spicy soup with chicken.', imageUrl: 'https://placehold.co/300x200/e74c3c/white?text=Chinese' },
      { id: 'c5', name: 'Chicken Wonton Soup', description: 'Clear soup with dumplings.', imageUrl: 'https://placehold.co/300x200/e74c3c/white?text=Chinese' },
      { id: 'c6', name: 'Veg Spring Roll', description: 'Fried rolls with vegetable filling.', imageUrl: 'https://placehold.co/300x200/e74c3c/white?text=Chinese' },
      { id: 'c7', name: 'Chilli Paneer (Dry)', description: 'Spicy Indo-Chinese paneer.', imageUrl: 'https://placehold.co/300x200/e74c3c/white?text=Chinese' },
      { id: 'c8', name: 'Veg Manchurian (Dry)', description: 'Fried vegetable balls.', imageUrl: 'https://placehold.co/300x200/e74c3c/white?text=Chinese' },
      { id: 'c9', name: 'Chilli Chicken (Dry)', description: 'Spicy battered chicken.', imageUrl: 'https://placehold.co/300x200/e74c3c/white?text=Chinese' },
      { id: 'c10', name: 'Drums of Heaven', description: 'Spicy chicken lollipops.', imageUrl: 'https://placehold.co/300x200/e74c3c/white?text=Chinese' },
      { id: 'c11', name: 'Veg Manchurian (Gravy)', description: 'Veg balls in a tangy sauce.', imageUrl: 'https://placehold.co/300x200/e74c3c/white?text=Chinese' },
      { id: 'c12', name: 'Chilli Paneer (Gravy)', description: 'Paneer in a spicy gravy.', imageUrl: 'https://placehold.co/300x200/e74c3c/white?text=Chinese' },
      { id: 'c13', name: 'Stir Fried Vegetables', description: 'Exotic veggies in soy sauce.', imageUrl: 'https://placehold.co/300x200/e74c3c/white?text=Chinese' },
      { id: 'c14', name: 'Sweet & Sour Vegetables', description: 'Veggies in sweet & sour sauce.', imageUrl: 'https://placehold.co/300x200/e74c3c/white?text=Chinese' },
      { id: 'c15', name: 'Chilli Chicken (Gravy)', description: 'Chicken in a spicy gravy.', imageUrl: 'https://placehold.co/300x200/e74c3c/white?text=Chinese' },
      { id: 'c16', name: 'Veg Hakka Noodles', description: 'Stir-fried noodles with vegetables.', imageUrl: 'https://placehold.co/300x200/e74c3c/white?text=Chinese' },
      { id: 'c17', name: 'Veg Fried Rice', description: 'Classic fried rice.', imageUrl: 'https://placehold.co/300x200/e74c3c/white?text=Chinese' },
      { id: 'c18', name: 'Schezwan Noodles (Veg)', description: 'Spicy Schezwan noodles.', imageUrl: 'https://placehold.co/300x200/e74c3c/white?text=Chinese' },
      { id: 'c19', name: 'Chicken Fried Rice', description: 'Fried rice with chicken.', imageUrl: 'https://placehold.co/300x200/e74c3c/white?text=Chinese' },
      { id: 'c20', name: 'Singapore Noodles (Veg)', description: 'Curry-flavored noodles.', imageUrl: 'https://placehold.co/300x200/e74c3c/white?text=Chinese' },
      { id: 'c21', name: 'American Chopsuey', description: 'Crispy noodles with sweet gravy.', imageUrl: 'https://placehold.co/300x200/e74c3c/white?text=Chinese' },
    ]
  },
  
  // 7. Rajasthani Special (21 items)
  {
    mainCategory: 'Rajasthani Special',
    items: [
      { id: 'r1', name: 'Dal Baati Churma', description: 'A classic Rajasthani platter.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Rajasthani' },
      { id: 'r2', name: 'Gatte ki Sabzi', description: 'Gram flour dumplings in gravy.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Rajasthani' },
      { id: 'r3', name: 'Ker Sangri', description: 'A traditional desert bean and berry dish.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Rajasthani' },
      { id: 'r4', name: 'Laal Maas', description: 'Fiery red mutton curry.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Rajasthani' },
      { id: 'r5', name: 'Safed Maas', description: 'White mutton curry with nuts.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Rajasthani' },
      { id: 'r6', name: 'Papad ki Sabzi', description: 'Papadum in a yogurt gravy.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Rajasthani' },
      { id: 'r7', name: 'Rajasthani Kadhi Pakora', description: 'Yogurt curry with fritters.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Rajasthani' },
      { id: 'r8', name: 'Mangodi Aloo ki Sabzi', description: 'Lentil dumplings and potato curry.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Rajasthani' },
      { id: 'r9', name: 'Pitod ki Sabzi', description: 'Gram flour cakes in gravy.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Rajasthani' },
      { id: 'r10', name: 'Rajasthani Bhindi', description: 'Okra cooked in a local style.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Rajasthani' },
      { id: 'r11', name: 'Missi Roti', description: 'Gram flour and wheat bread.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Rajasthani' },
      { id: 'r12', name: 'Bajra Roti', description: 'Pearl millet flatbread.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Rajasthani' },
      { id: 'r13', name: 'Bejad ki Roti', description: 'Mixed grain flatbread.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Rajasthani' },
      { id: 'r14', name: 'Gatte ka Pulao', description: 'Spiced rice with gram flour dumplings.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Rajasthani' },
      { id: 'r15', name: 'Jodhpuri Kabuli Pulao', description: 'Rich rice dish with vegetables.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Rajasthani' },
      { id: 'r16', name: 'Moong Dal Halwa', description: 'Rich lentil dessert.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Rajasthani' },
      { id: 'r17', name: 'Malpua Rabri', description: 'Sweet pancakes with thickened milk.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Rajasthani' },
      { id: 'r18', name: 'Ghewar', description: 'Traditional disc-shaped sweet.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Rajasthani' },
      { id: 'r19', name: 'Lehsun ki Chutney', description: 'Spicy garlic chutney.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Rajasthani' },
      { id: 'r20', name: 'Mirchi ke Tapore', description: 'Instant green chilli pickle.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Rajasthani' },
      { id: 'r21', name: 'Dal Pakwan', description: 'Crispy flatbread with lentil curry.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Rajasthani' },
    ]
  },
  
  // 8. Breads (21 items)
  {
    mainCategory: 'Breads',
    items: [
      { id: 'b1', name: 'Butter Naan', description: 'Soft leavened bread from the tandoor.', imageUrl: 'https://placehold.co/300x200/8e44ad/white?text=Breads' },
      { id: 'b2', name: 'Garlic Naan', description: 'Naan bread with garlic.', imageUrl: 'https://placehold.co/300x200/8e44ad/white?text=Breads' },
      { id: 'b3', name: 'Plain Naan', description: 'Classic leavened bread.', imageUrl: 'https://placehold.co/300x200/8e44ad/white?text=Breads' },
      { id: 'b4', name: 'Tandoori Roti', description: 'Whole wheat bread from tandoor.', imageUrl: 'https://placehold.co/300x200/8e44ad/white?text=Breads' },
      { id: 'b5', name: 'Butter Tandoori Roti', description: 'Whole wheat bread with butter.', imageUrl: 'https://placehold.co/300x200/8e44ad/white?text=Breads' },
      { id: 'b6', name: 'Lachha Paratha', description: 'Layered whole wheat bread.', imageUrl: 'https://placehold.co/300x200/8e44ad/white?text=Breads' },
      { id: 'b7', name: 'Pudina Paratha', description: 'Mint-flavored layered bread.', imageUrl: 'https://placehold.co/300x200/8e44ad/white?text=Breads' },
      { id: 'b8', name: 'Missi Roti', description: 'Gram flour and wheat bread.', imageUrl: 'https://placehold.co/300x200/8e44ad/white?text=Breads' },
      { id: 'b9', name: 'Aloo Kulcha', description: 'Stuffed bread with potato.', imageUrl: 'https://placehold.co/300x200/8e44ad/white?text=Breads' },
      { id: 'b10', name: 'Paneer Kulcha', description: 'Stuffed bread with paneer.', imageUrl: 'https://placehold.co/300x200/8e44ad/white?text=Breads' },
      { id: 'b11', name: 'Tawa Roti (Phulka)', description: 'Simple whole wheat bread.', imageUrl: 'https://placehold.co/300x200/8e44ad/white?text=Breads' },
      { id: 'b12', name: 'Plain Paratha', description: 'Fried whole wheat bread.', imageUrl: 'https://placehold.co/300x200/8e44ad/white?text=Breads' },
      { id: 'b13', name: 'Aloo Paratha', description: 'Stuffed with spiced potatoes.', imageUrl: 'https://placehold.co/300x200/8e44ad/white?text=Breads' },
      { id: 'b14', name: 'Gobi Paratha', description: 'Stuffed with spiced cauliflower.', imageUrl: 'https://placehold.co/300x200/8e44ad/white?text=Breads' },
      { id: 'b15', name: 'Paneer Paratha', description: 'Stuffed with spiced paneer.', imageUrl: 'https://placehold.co/300x200/8e44ad/white?text=Breads' },
      { id: 'b16', name: 'Thepla', description: 'Gujarati fenugreek flatbread.', imageUrl: 'https://placehold.co/300x200/8e44ad/white?text=Breads' },
      { id: 'b17', name: 'Puri', description: 'Deep-fried puffed bread.', imageUrl: 'https://placehold.co/300x200/8e44ad/white?text=Breads' },
      { id: 'b18', name: 'Bhatura', description: 'Large fried leavened bread.', imageUrl: 'https://placehold.co/300x200/8e44ad/white?text=Breads' },
      { id: 'b19', name: 'Makki di Roti', description: 'Cornmeal flatbread.', imageUrl: 'https://placehold.co/300x200/8e44ad/white?text=Breads' },
      { id: 'b20', name: 'Roomali Roti', description: 'Paper-thin "handkerchief" bread.', imageUrl: 'https://placehold.co/300x200/8e44ad/white?text=Breads' },
      { id: 'b21', name: 'Cheese Garlic Bread', description: 'Toasted bread with cheese and garlic.', imageUrl: 'https://placehold.co/300x200/8e44ad/white?text=Breads' },
    ]
  },
  
  // 9. Rice (21 items)
  {
    mainCategory: 'Rice',
    items: [
      { id: 'ri1', name: 'Veg Biryani', description: 'Aromatic rice with mixed vegetables.', imageUrl: 'https://placehold.co/300x200/16a085/white?text=Rice' },
      { id: 'ri2', name: 'Hyderabadi Chicken Biryani', description: 'Spiced chicken and rice.', imageUrl: 'https://placehold.co/300x200/16a085/white?text=Rice' },
      { id: 'ri3', name: 'Mutton Biryani', description: 'Aromatic rice with mutton.', imageUrl: 'https://placehold.co/300x200/16a085/white?text=Rice' },
      { id: 'ri4', name: 'Veg Pulao', description: 'Simple rice with peas and vegetables.', imageUrl: 'https://placehold.co/300x200/16a085/white?text=Rice' },
      { id: 'ri5', name: 'Kashmiri Pulao', description: 'Sweet rice with fruits and nuts.', imageUrl: 'https://placehold.co/300x200/16a085/white?text=Rice' },
      { id: 'ri6', name: 'Tawa Pulao', description: 'Spiced rice cooked on a flat griddle.', imageUrl: 'https://placehold.co/300x200/16a085/white?text=Rice' },
      { id: 'ri7', name: 'Paneer Pulao', description: 'Rice with paneer and spices.', imageUrl: 'https://placehold.co/300x200/16a085/white?text=Rice' },
      { id: 'ri8', name: 'Gatte ka Pulao', description: 'Rajasthani rice with dumplings.', imageUrl: 'https://placehold.co/300x200/16a085/white?text=Rice' },
      { id: 'ri9', name: 'Lucknowi Biryani', description: 'Mild and aromatic biryani.', imageUrl: 'https://placehold.co/300x200/16a085/white?text=Rice' },
      { id: 'ri10', name: 'Egg Biryani', description: 'Aromatic rice with boiled eggs.', imageUrl: 'https://placehold.co/300x200/16a085/white?text=Rice' },
      { id: 'ri11', name: 'Steamed Basmati Rice', description: 'Plain white basmati rice.', imageUrl: 'https://placehold.co/300x200/16a085/white?text=Rice' },
      { id: 'ri12', name: 'Jeera Rice', description: 'Cumin-tempered basmati rice.', imageUrl: 'https://placehold.co/300x200/16a085/white?text=Rice' },
      { id: 'ri13', name: 'Peas Pulao', description: 'Rice with green peas.', imageUrl: 'https://placehold.co/300x200/16a085/white?text=Rice' },
      { id: 'ri14', name: 'Lemon Rice', description: 'South Indian tempered rice.', imageUrl: 'https://placehold.co/300x200/16a085/white?text=Rice' },
      { id: 'ri15', name: 'Curd Rice', description: 'South Indian yogurt rice.', imageUrl: 'https://placehold.co/300x200/16a085/white?text=Rice' },
      { id: 'ri16', name: 'Tamarind Rice', description: 'South Indian tamarind rice.', imageUrl: 'https://placehold.co/300x200/16a085/white?text=Rice' },
      { id: 'ri17', name: 'Coconut Rice', description: 'South Indian coconut rice.', imageUrl: 'https://placehold.co/300x200/16a085/white?text=Rice' },
      { id: 'ri18', name: 'Saffron Rice', description: 'Rice flavored with saffron.', imageUrl: 'https://placehold.co/300x200/16a085/white?text=Rice' },
      { id: 'ri19', name: 'Khichdi', description: 'Rice and lentil porridge.', imageUrl: 'https://placehold.co/300x200/16a085/white?text=Rice' },
      { id: 'ri20', name: 'Bisibelebath', description: 'Karnataka lentil rice.', imageUrl: 'https://placehold.co/300x200/16a085/white?text=Rice' },
      { id: 'ri21', name: 'Mushroom Pulao', description: 'Aromatic rice with mushrooms.', imageUrl: 'https://placehold.co/300x200/16a085/white?text=Rice' },
    ]
  },
  
  // 10. Desserts (21 items)
  {
    mainCategory: 'Desserts',
    items: [
      { id: 'de1', name: 'Gulab Jamun', description: 'Hot milk solids dumplings in syrup.', imageUrl: 'https://placehold.co/300x200/d35400/white?text=Desserts' },
      { id: 'de2', name: 'Moong Dal Halwa', description: 'Rich Rajasthani lentil dessert.', imageUrl: 'https://placehold.co/300x200/d35400/white?text=Desserts' },
      { id: 'de3', name: 'Gajar ka Halwa', description: 'Sweet carrot pudding.', imageUrl: 'https://placehold.co/300x200/d35400/white?text=Desserts' },
      { id: 'de4', name: 'Jalebi with Rabri', description: 'Hot swirls with thickened milk.', imageUrl: 'https://placehold.co/300x200/d35400/white?text=Desserts' },
      { id: 'de5', name: 'Malpua with Rabri', description: 'Sweet pancakes with thickened milk.', imageUrl: 'https://placehold.co/300x200/d35400/white?text=Desserts' },
      { id: 'de6', name: 'Rasmalai', description: 'Cheese dumplings in saffron milk.', imageUrl: 'https://placehold.co/300x200/d35400/white?text=Desserts' },
      { id: 'de7', name: 'Shahi Tukda', description: 'Fried bread in sweet milk.', imageUrl: 'https://placehold.co/300x200/d35400/white?text=Desserts' },
      { id: 'de8', name: 'Phirni', description: 'Ground rice pudding (set).', imageUrl: 'https://placehold.co/300x200/d35400/white?text=Desserts' },
      { id: 'de9', name: 'Rasgulla', description: 'Spongy cheese balls in syrup.', imageUrl: 'https://placehold.co/300x200/d35400/white?text=Desserts' },
      { id: 'de10', name: 'Fruit Cream', description: 'Mixed fruits in sweet cream.', imageUrl: 'https://placehold.co/300x200/d35400/white?text=Desserts' },
      { id: 'de11', name: 'Brownie with Ice Cream', description: 'Warm fudge brownie with vanilla.', imageUrl: 'https://placehold.co/300x200/d35400/white?text=Desserts' },
      { id: 'de12', name: 'Blueberry Cheesecake', description: 'Classic baked cheesecake.', imageUrl: 'https://placehold.co/300x200/d35400/white?text=Desserts' },
      { id: 'de13', name: 'Chocolate Mousse', description: 'Light and airy chocolate dessert.', imageUrl: 'https://placehold.co/300x200/d35400/white?text=Desserts' },
      { id: 'de14', name: 'Tiramisu', description: 'Coffee-flavored Italian dessert.', imageUrl: 'https://placehold.co/300x200/d35400/white?text=Desserts' },
      { id: 'de15', name: 'Red Velvet Pastry', description: 'Red velvet cake slice.', imageUrl: 'https://placehold.co/300x200/d35400/white?text=Desserts' },
      { id: 'de16', name: 'Kesar Pista Kulfi', description: 'Saffron and pistachio kulfi.', imageUrl: 'https://placehold.co/300x200/d35400/white?text=Desserts' },
      { id: 'de17', name: 'Malai Kulfi', description: 'Classic cream kulfi.', imageUrl: 'https://placehold.co/300x200/d35400/white?text=Desserts' },
      { id: 'de18', name: 'Vanilla Ice Cream', description: 'Classic vanilla scoop.', imageUrl: 'https://placehold.co/300x200/d35400/white?text=Desserts' },
      { id: 'de19', name: 'Chocolate Ice Cream', description: 'Rich chocolate scoop.', imageUrl: 'https://placehold.co/300x200/d35400/white?text=Desserts' },
      { id: 'de20', name: 'Tutti Frutti Ice Cream', description: 'Ice cream with candied fruits.', imageUrl: 'https://placehold.co/300x200/d35400/white?text=Desserts' },
      { id: 'de21', name: 'Shrikhand', description: 'Sweet strained yogurt dessert.', imageUrl: 'https://placehold.co/300x200/d35400/white?text=Desserts' },
    ]
  },
];
// --- END DUMMY DATA ---

// Separate component to handle search params
function MenuContent() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].mainCategory);

  const activeCategoryData = menuData.find(
    (category) => category.mainCategory === activeCategory
  );
  
  const itemsToShow = activeCategoryData ? activeCategoryData.items : [];

  return (
    <div className={styles.menuPage}>
      <h1 className={styles.pageTitle}>Our Culinary Offerings</h1>
      
      <div className={styles.menuLayout}>
        {/* LEFT COLUMN: Category Navigation */}
        <nav className={styles.categoryNav}>
          <ul>
            {menuData.map((category) => (
              <li key={category.mainCategory}>
                <button
                  className={activeCategory === category.mainCategory ? styles.active : ''}
                  onClick={() => setActiveCategory(category.mainCategory)}
                >
                  {category.mainCategory}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* RIGHT COLUMN: Item Display */}
        <main className={styles.itemDisplay}>
          <h2>{activeCategory}</h2>
          <div className={styles.itemGrid}>
            {itemsToShow.map((item) => (
              <MenuItem
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                imageUrl={item.imageUrl}
                category={activeCategory}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function MenuPage() {
  return (
    <Suspense fallback={<div className={styles.menuPage}><h1>Loading menu...</h1></div>}>
      <MenuContent />
    </Suspense>
  );
}