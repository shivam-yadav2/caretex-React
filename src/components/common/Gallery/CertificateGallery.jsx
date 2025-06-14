import { useState } from "react";
import { Card, CardContent, CardFooter } from "../../../components copy/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "../../../components copy/ui/dialog";

const certificates = [
    {
        id: 1,
        title: "Ce Certificate",
        src: "/assets/MFG-page-00.jpg",
        alt: "Ce Certificate"
    },
    {
        id: 2,
        title: "Food and Drug Administration",
        src: "/assets/page-0001.jpg",
        alt: "Food and Drug Administration"
    },
    {
        id: 3,
        title: "GST Certificate MFG",
        src: "/assets/NEW_page-001.jpg",
        alt: "GST Certificate MFG"
    },
    {
        id: 4,
        title: "GST Certificate MFG",
        src: "/assets/NEW_page-003.jpg",
        alt: "GST Certificate MFG"
    },
    {
        id: 5,
        title: "ISO Manufacturing G Certificate",
        src: "/assets/ISO MANUFACTURING CERTIFICATE (MFG)_page-0001.jpg",
        alt: "ISO Manufacturing G Certificate"
    },
    {
        id: 6,
        title: "Trade Mark Certificate",
        src: "/assets/1.jpg",
        alt: "Trade Mark Certificate"
    },
    {
        id: 7,
        title: "Udyam Registration Certificate",
        src: "/assets/06.09.2023 MS...jpg",
        alt: "Udyam Registration Certificate"
    }
];

export default function CertificateGallery() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="container mx-auto py-12">
            <h1 className="text-4xl font-bold text-center mb-12">Our Certificates</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                    <Dialog key={cert.id} onOpenChange={(open) => open && setSelectedImage(cert)}>
                        <DialogTrigger asChild>
                            <Card
                                className="cursor-pointer hover:shadow-lg transition-shadow"
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && setSelectedImage(cert)}
                            >
                                <CardContent className="p-0">
                                    <div className="relative w-full h-48 overflow-hidden">
                                        <img
                                            src={cert.src}
                                            alt={cert.alt}
                                            className="w-full h-full object-cover rounded-t-lg"
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4">
                                    <p className="text-center font-medium w-full">{cert.title}</p>
                                </CardFooter>
                            </Card>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl p-0 border-0 bg-transparent">
                            <div className="relative w-full h-[60vh]">
                                <img
                                    src={selectedImage?.src}
                                    alt={selectedImage?.alt}
                                    className="w-full h-full object-contain rounded-lg"
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </div>
    );
}