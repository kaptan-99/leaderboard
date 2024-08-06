// src/app/api/leaderboard/route.js
import { NextResponse } from "next/server";
import axios from "axios";
import clientPromise from "@/lib/mongodb";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { createCanvas, loadImage } from "canvas";

export async function GET() {
  try {
    // console.log("Fetching JSON data from Google Sheets API");
    const response = await axios.get(
      "https://sheets.googleapis.com/v4/spreadsheets/1k7m8ZZnKGjUXF1Q6YE2uor4Sf9XyTXomIko0yOS6vic/values/Ordered%20Data?alt=json&key=AIzaSyD5W7DJLgNzk8UlmOAL-yMTnp0yxb662rs"
    );
    const rows = response.data.values;

    // console.log("Extracting and formatting required fields from each row");
    const formattedData = rows
      .slice(1)
      .map((row) => ({
        cityName: row[0] || "", // City
        postWeek: row[1] || "", // 4 FB Post in Last 15 days
        robinGreen: row[2] || "", // Minimum 2 Post Robins in Green
      }))
      .filter((data) => data.cityName); // Ensure cityName is not empty

    const now = new Date();
    const previousMonth =
      now.getMonth() === 0
        ? "december"
        : new Date(now.setMonth(now.getMonth() - 1))
            .toLocaleString("default", { month: "long" })
            .toLowerCase();
    const previousMonthYear = `${previousMonth}_${now.getFullYear()}`;

    // console.log("Connecting to MongoDB");
    const client = await clientPromise;
    const db = client.db("monthData");
    const collectionName = previousMonthYear;

    // console.log(`Using collection: ${collectionName}`);
    const collection = db.collection(collectionName);

    //  console.log("Upserting data");
    await collection.deleteMany({});
    await collection.insertMany(formattedData);

    // Adding path and fs operations
    const imagesDir = path.join(
      process.cwd(),
      "public",
      "dynamic",
      "img",
      "expoted",
      "sm"
    );
    const basePath = path.join(process.cwd(), "public", "dynamic", "img");

    console.log("Images directory:", imagesDir);
    console.log("Base path:", basePath);

    // Test if the directories and paths are correct
    if (!fs.existsSync(imagesDir)) {
      throw new Error("Images directory does not exist");
    }
    if (!fs.existsSync(basePath)) {
      throw new Error("Base path does not exist");
    }

    // for date 1st to 30th April 2024
    const formatDateRange = () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      let targetMonth = currentMonth === 4 ? 3 : currentMonth - 1;
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const month = monthNames[targetMonth];
      const firstDay = new Date(currentYear, targetMonth, 1);
      const lastDay = new Date(currentYear, targetMonth + 1, 0);
      const formatDay = (day) =>
        `${day}${
          [1, 21, 31].includes(day)
            ? "st"
            : [2, 22].includes(day)
            ? "nd"
            : [3, 23].includes(day)
            ? "rd"
            : "th"
        }`;
      return `${formatDay(1)} ${month} to ${formatDay(
        lastDay.getDate()
      )} ${month} ${lastDay.getFullYear()}`;
    };

    // Load images
    const imageBuffer = fs.readFileSync(
      path.join(basePath, "sm_leaderboard.png")
    );
    const greenBuffer = fs.readFileSync(path.join(basePath, "sm_green.png"));
    const yellowBuffer = fs.readFileSync(path.join(basePath, "sm_yellow.png"));
    const redBuffer = fs.readFileSync(path.join(basePath, "sm_red.png"));
    const lineGrid = fs.readFileSync(path.join(basePath, "sm_grid.png"));

    console.log("Images loaded successfully");

    const baseImage = await loadImage(imageBuffer);
    const greenImage = await loadImage(greenBuffer);
    const yellowImage = await loadImage(yellowBuffer);
    const redImage = await loadImage(redBuffer);
    const gridImage = await loadImage(lineGrid);
    const text = "Social Media Leaderboard";
    const dataReal = rows.slice(1);

    const canvas = createCanvas(baseImage.width, baseImage.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    ctx.font = "50px sans-serif";
    ctx.fillStyle = "black";
    ctx.fillText(
      text.toUpperCase(),
      (baseImage.width - ctx.measureText(text.toUpperCase()).width) / 2,
      85
    );
    ctx.font = "35px sans-serif";
    ctx.fillText(
      formatDateRange().toUpperCase(),
      (baseImage.width -
        ctx.measureText(formatDateRange().toUpperCase()).width) /
        2,
      135
    );

    let initialCount_y = 306;
    let initialCount_x = 38;
    let initialPaller_y_1 = 285;
    let initialPaller_x_1 = 222;
    let dataLength = 1;

    for (let j = 0; j < 6; j++) {
      for (let i = 0; i <= 57; i++) {
        ctx.font = "20px sans-serif";
        ctx.fillText(dataReal[dataLength][0], initialCount_x, initialCount_y);

        if (
          dataReal[dataLength][1] == "Yes" &&
          dataReal[dataLength][2] == "Yes"
        ) {
          // Draw green buffer image
          const greenBuffer_print = await loadImage(greenBuffer);
          ctx.drawImage(
            greenBuffer_print,
            initialPaller_x_1 + 2,
            initialPaller_y_1,
            greenBuffer_print.width,
            greenBuffer_print.height
          );
        } else if (
          (dataReal[dataLength][1] == "No" &&
            dataReal[dataLength][2] == "Yes") ||
          (dataReal[dataLength][1] == "Yes" && dataReal[dataLength][2] == "No")
        ) {
          // Draw yellow buffer image
          const yellowBuffer_print = await loadImage(yellowBuffer);
          ctx.drawImage(
            yellowBuffer_print,
            initialPaller_x_1 + 2,
            initialPaller_y_1,
            yellowBuffer_print.width,
            yellowBuffer_print.height
          );
        } else if (
          dataReal[dataLength][1] == "No" &&
          dataReal[dataLength][2] == "No"
        ) {
          // Draw red buffer image
          const redBuffer_print = await loadImage(redBuffer);
          ctx.drawImage(
            redBuffer_print,
            initialPaller_x_1 + 2,
            initialPaller_y_1,
            redBuffer_print.width,
            redBuffer_print.height
          );
        }
        // robin in green "Yes / No"
        ctx.fillText(
          dataReal[dataLength][1],
          initialCount_x + 240,
          initialCount_y
        );
        // 2 post per week "Yes / No"
        ctx.fillText(
          dataReal[dataLength][2],
          initialCount_x + 380,
          initialCount_y
        );

        initialPaller_y_1 = initialPaller_y_1 + 30;
        initialCount_y = initialCount_y + 30;
        dataLength++;
        if (i == 57) {
          initialCount_y = 306;
          initialPaller_y_1 = 285;
        }
        if (dataReal.length <= dataLength) {
          break;
        }
      }
      initialCount_x = initialCount_x + 493;
      initialPaller_x_1 = initialPaller_x_1 + 493;
    }

    ctx.drawImage(gridImage, 25, 150, gridImage.width, gridImage.height);

    const upLoadPath = "https://rha.gurdeep.net/dynamic/img/expoted/sm";
    const uploadServer =
      previousMonthYear + "_" + Math.floor(Math.random() * 1000000) + ".png";
    const outputBuffer = canvas.toBuffer("image/png");
    const outputPath = path.join(imagesDir, uploadServer);
    fs.writeFileSync(outputPath, outputBuffer);

    // console.log(`Image saved at: ${outputPath}`);
    const nowOutput = new Date();
    const previousMonthOutput =
      now.getMonth() === 0
        ? "december"
        : new Date(now.setMonth(now.getMonth() - 1))
            .toLocaleString("default", { month: "long" })
            .toLowerCase();
            const previousMonthYearOutput = `${previousMonth}_${now.getFullYear()}`;
            const previousMonthYearMongoOutput = `${previousMonth.toUpperCase()} ${now.getFullYear()}`;

   

    // console.log("Extracting and formatting required fields from each row");
    const formattedDataOutput = {
      printTime: new Date(), // City
      monthData: previousMonthYearMongoOutput, // 4 FB Post in Last 15 days
      Url: upLoadPath + "/" + uploadServer, // Minimum 2 Post Robins in Green
    }; // Ensure cityName is not empty

    // console.log("Connecting to MongoDB");
    const clientOutput = await clientPromise;
    const dbOutput = clientOutput.db("test");
    // console.log(`Using collection: ${collectionName}`);
    const collectionOutput = dbOutput.collection("sm_table");

    //  console.log("Upserting data");

    await collectionOutput.insertOne(formattedDataOutput);

    return NextResponse.json(
      {
        data: {
          printAt: new Date(),
          monthData: previousMonthYearMongoOutput,
          status: "success",
          message: "Image created successfully",
          path: upLoadPath + "/" + uploadServer,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing data:", error.message);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
