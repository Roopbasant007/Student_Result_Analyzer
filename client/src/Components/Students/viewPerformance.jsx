import {Box, Divider, Heading, Text, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import StudentDashBoard from "./studentDashBoard";
import { Chart as ChartJS } from "chart.js/auto";
import "../../App.css"
import CurCourseBar from "./curCourseBar";



const UserData = [20, 30, 21, 55]
const Maxmarks = [25, 40, 25, 60]
const Test = ["Test-1", "Mid-term", "Test-3", "End-Term"]   

function CourseRemarks(){

    return (
        <>
        <CurCourseBar />
       <Box justifyContent={'center'} margin={'auto'} display={'flex'} padding={20}>
          <Stack direction={'column'} width={600} textAlign={'justify'}>
            <Heading textAlign={'center'} size={'lg'} padding={10}>Remarks</Heading>
            <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
             when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
             It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
             and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
          </Stack>
       </Box>
       </>
    )
}

function Performance() {
    const data = {
        labels: Test.map((data) => data),
        datasets: [
            {
                label: "Maximum marks",
                data: Maxmarks.map((data) => data),
                backgroundColor: "Green",
                borderColor: "black",
                borderWidth: 1,
            },
                {
                    label: " Marks Obtained",
                    data: UserData.map((data) => data),
                    backgroundColor: "Yellow",
                    borderColor: "black",
                    borderWidth: 1,
                }
        ],
    };

    return (
        <>
        <StudentDashBoard />
        <CurCourseBar />
        <Box maxW={800} padding={25} textAlign={'left'} justifyContent={'center'} margin={'auto'}>
            <Heading size={'md'}>Performance Plot</Heading>
            <Divider orientation="horizontal" colorScheme="gray" variant={'solid'} width={'100%'} />
            <Box width={600}>
                <Bar
                    data={data}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Student Performance"
                            },
                            legend: {
                                display: true,
                                position: 'top',
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: true
                                },
                                title: {
                                    display: true,
                                    text: "Test Type"
                                }
                            },
                            y: {
                                grid: {
                                    display: true
                                },
                                title: {
                                    display: true,
                                    text: "Marks"
                                },
                                min: 0,
                                max: 70,
                                beginAtZero: true
                            }
                        },

                    }}
                />
            </Box>
        </Box>
        </>
    )

}

export default Performance;
export { CourseRemarks};