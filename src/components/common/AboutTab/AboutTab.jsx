// app/page.tsx
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components copy/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components copy/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components copy/ui/avatar';
import { Badge } from '../../../components copy/ui/badge';
import AboutSection from '../HomeSection/AboutSection';
import CertificateGallery from '../Gallery/CertificateGallery';
// import { CertificateIcon } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Tabs defaultValue="about-us" className="flex flex-col md:flex-row gap-6">
                    {/* Vertical Tabs List */}
                    <TabsList className="flex flex-col w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md h-fit">
                        <TabsTrigger
                            value="about-us"
                            className="w-full text-left py-3 px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white"
                        >
                            About Us
                        </TabsTrigger>
                        <TabsTrigger
                            value="founders"
                            className="w-full text-left py-3 px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white"
                        >
                            About Founders
                        </TabsTrigger>
                        <TabsTrigger
                            value="achievements"
                            className="w-full text-left py-3 px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white"
                        >
                            Our Achievements
                        </TabsTrigger>
                        <TabsTrigger
                            value="certificates"
                            className="w-full text-left py-3 px-4 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white"
                        >
                            Certificates
                        </TabsTrigger>
                    </TabsList>

                    {/* Tabs Content */}
                    <div className="w-full md:w-3/4">
                        {/* About Us Tab */}
                        <TabsContent value="about-us">
                            <Card>
                                <CardHeader>
                                    {/* <CardTitle>About Us</CardTitle> */}
                                </CardHeader>
                                <CardContent>
                                    <div className="w-full  lg:pl-12">
                                        <div className="text-left">
                                            {/* <span className="text-xs md:text-sm uppercase bg-gray-100 text-primary font-semibold px-3 py-1 md:px-4 md:py-1.5 rounded-full inline-block border border-[#6b2a2e]">
                                                About Us
                                            </span> */}
                                            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gold leading-tight">
                                                We Are The Best For <br />
                                                <span className="text-[#f59f8b]">Patient Care</span>
                                            </h2>
                                            <p className="mt-6 text-gray-600 text-sm md:text-base lg:text-lg leading-[1.8] text-justify">
                                                Care-tex is a rehabilitation and orthopedic manufacturing
                                                company based in Lucknow, Uttar Pradesh. Care-tex was
                                                established in the year 2000 and as the name states, it was
                                                formed with the motive to provide care and comfort to its user
                                                with the help of textile at minimum cost. The organization has
                                                shown a very rapid and healthy growth since its inception, and
                                                it’s one of the key companies in India providing good quality
                                                products at a reasonable price.
                                            </p>
                                        </div>


                                    </div>

                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* About Founders Tab */}
                        <TabsContent value="founders">
                            <Card>
                                <CardHeader>
                                    <CardTitle>About Our Founders</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-16 w-16">
                                                <AvatarImage src="/founder1.jpg" alt="Founder 1" />
                                                <AvatarFallback>J</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="text-lg font-semibold">XYZ</h3>
                                                <p className="text-gray-600">CEO & Co-Founder</p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    John brings 15 years of experience in tech leadership, driving our vision forward.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-16 w-16">
                                                <AvatarImage src="/founder2.jpg" alt="Founder 2" />
                                                <AvatarFallback>J</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="text-lg font-semibold">ABC</h3>
                                                <p className="text-gray-600">CTO & Co-Founder</p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Jane is the tech genius behind our innovative solutions, with a PhD in Computer Science.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Achievements Tab */}
                        <TabsContent value="achievements">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Our Achievements</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-2">
                                            <Badge variant="default">2023</Badge>
                                            <div>
                                                <h4 className="font-semibold">Best Startup Award</h4>
                                                <p className="text-gray-600">Recognized at the Global Tech Summit for innovation.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Badge variant="default">2022</Badge>
                                            <div>
                                                <h4 className="font-semibold">1M Users Milestone</h4>
                                                <p className="text-gray-600">Reached 1 million active users on our platform.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Badge variant="default">2021</Badge>
                                            <div>
                                                <h4 className="font-semibold">ISO Certification</h4>
                                                <p className="text-gray-600">Achieved ISO 9001 for quality management.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Certificates Tab */}
                        <TabsContent value="certificates">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Certificates</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CertificateGallery />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}