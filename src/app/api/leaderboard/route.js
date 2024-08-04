// src/app/api/leaderboard/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';
import clientPromise from '@/lib/mongodb';

export async function POST() {
  try {
    // Fetch JSON data from the provided URL
    const response = await axios.get('https://sheets.googleapis.com/v4/spreadsheets/1k7m8ZZnKGjUXF1Q6YE2uor4Sf9XyTXomIko0yOS6vic/values/Ordered%20Data?alt=json&key=AIzaSyD5W7DJLgNzk8UlmOAL-yMTnp0yxb662rs');
    const rows = response.data.values;

    // Extract and format the required fields from each row
    const formattedData = rows.slice(1)
      .map(row => ({
        cityName: row[0] || '',   // City
        postWeek: row[1] || '',   // 4 FB Post in Last 15 days
        robinGreen: row[2] || ''  // Minimum 2 Post Robins in Green
      }))
      .filter(data => data.cityName); // Ensure cityName is not empty

    // Determine the current month and year
    const now = new Date();
    const month = now.toLocaleString('default', { month: 'long' }).toLowerCase();
    const year = now.getFullYear();
    const previousMonth = now.getMonth() === 0 ? 'december' : new Date(now.setMonth(now.getMonth() - 1)).toLocaleString('default', { month: 'long' }).toLowerCase();
    const previousMonthYear = `${previousMonth}_${year}`;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("monthData");

    // Use the database and collection names

    const collectionName = previousMonthYear;
    const collection = db.collection(collectionName);

    // Upsert data (update if exists, otherwise insert)
    await collection.deleteMany({}); // Clear existing data before upserting
    await collection.insertMany(formattedData);

    return NextResponse.json({ message: 'Data processed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing data:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
