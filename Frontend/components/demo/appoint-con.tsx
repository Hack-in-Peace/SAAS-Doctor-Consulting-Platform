"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "../ui/skeleton"
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  FileText,
  Download,
  Printer,
  Edit,
  X,
  Heart,
  QrCode,
  CalendarPlus,
} from "lucide-react"
import { useEffect, useState } from "react"

// Sample appointment data - in real app this would come from props or API
const appointmentData = {
  confirmationNumber: "APT-2024-001234",
  status: "confirmed",
  patient: {
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1985-03-15",
    insurance: "Blue Cross Blue Shield",
  },
  doctor: {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    image: "/placeholder.svg?height=100&width=100",
    phone: "(555) 987-6543",
    email: "s.johnson@medicareplus.com",
  },
  appointment: {
    date: "2024-01-15",
    time: "10:30 AM",
    type: "General Consultation",
    duration: "30 minutes",
    reason: "Annual heart check-up and blood pressure monitoring",
  },
  location: {
    name: "MediCare Plus Clinic",
    address: "123 Healthcare Ave, Downtown",
    floor: "3rd Floor, Suite 301",
    parking: "Free parking available",
  },
  billing: {
    consultationFee: 150,
    bookingFee: 50,
    total: 200,
    paymentMethod: "Credit Card ending in 4567",
    paymentStatus: "Paid",
  },
  instructions: [
    "Please arrive 15 minutes before your appointment time",
    "Bring a valid photo ID and insurance card",
    "Bring a list of current medications",
    "Fast for 8 hours if blood work is required",
  ],
}

export default function AppointmentConfirmation() {

  const [appData, setAppData] = useState<any>(null);
  useEffect(()=>{
    //@ts-ignore
    setAppData(JSON.parse(localStorage.getItem("appointment")));
    
  },[])
  const appointmentDate = new Date(
    `${appointmentData.appointment.date}T${convertTo24Hour(appointmentData.appointment.time)}`,
  )

  const handlePrint = () => {
    window.print()
  }

  const handleAddToCalendar = () => {
    const startDate = appointmentDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    const endDate =
      new Date(appointmentDate.getTime() + 30 * 60000).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Doctor Appointment - ${appData.doctor}&dates=${startDate}/${endDate}&details=Appointment with ${appData.doctor} (Cardiology)&location=1234 Procrastination Avenue, Nowhereville`

    window.open(calendarUrl, "_blank")
  }

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert("PDF download functionality would be implemented here")
  }

  return (
    <div>
      {appData? 
       <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h1>
          <p className="text-gray-600">Your appointment has been successfully booked</p>
          <Badge variant="secondary" className="mt-2">
            Confirmation #{appData._id}
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Appointment Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Appointment Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Appointment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Doctor Information */}
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                  <Avatar className="h-16 w-16">
            
                    <AvatarFallback>
                      <Heart className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{appData.doctor}</h3>
                    <p className="text-gray-600">Cardiology</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        +91 1313131313
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        support@consultease.com
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Date & Time */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Date & Time</span>
                    </div>
                    <div className="pl-7 space-y-1">
                      <p className="text-lg font-semibold">
                        {appointmentDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>
                          {appData.time} (30 mins)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Location</span>
                    </div>
                    <div className="pl-7 space-y-1">
                      <p className="font-semibold">Consul-ease hospital</p>
                      <p className="text-gray-600">1234 Procrastination Avenue, Nowhereville</p>
                      <p className="text-gray-600">4th floor</p>
                      <p className="text-sm text-green-600">Parking Available</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Appointment Type & Reason */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Appointment Information</span>
                  </div>
                  <div className="pl-7 space-y-2">
                    <div>
                      <span className="text-sm text-gray-500">Type:</span>
                      <p className="font-medium">General Enquiry</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Reason for visit:</span>
                      <p className="text-gray-700">Heart Pain</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Patient Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Patient Name:</span>
                      <p className="font-medium">{`${appData.f_name} ${appData.l_name}`}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Email:</span>
                      <p className="text-gray-700">{appData.email}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Phone:</span>
                      <p className="text-gray-700">{appData.phone_num}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Date of Birth:</span>
                      <p className="text-gray-700">
                        {new Date(appointmentData.appointment.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Insurance:</span>
                      <p className="text-gray-700">Full Insurance</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pre-Appointment Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Pre-Appointment Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {appointmentData.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleAddToCalendar} className="w-full" variant="outline">
                  <CalendarPlus className="h-4 w-4 mr-2" />
                  Add to Calendar
                </Button>
                <Button onClick={handleDownloadPDF} className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button onClick={handlePrint} className="w-full" variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Details
                </Button>
              </CardContent>
            </Card>

            {/* Billing Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Billing Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Consultation Fee</span>
                  <span>Rs {appointmentData.billing.consultationFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Booking Fee</span>
                  <span>Rs {appointmentData.billing.bookingFee}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total Paid</span>
                  <span>Rs {appointmentData.billing.total}</span>
                </div>
                <div className="text-xs text-gray-500">
                  <p>Payment Method: {appointmentData.billing.paymentMethod}</p>
                  <Badge variant="secondary" className="mt-1">
                    {appointmentData.billing.paymentStatus}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* QR Code */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Access</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-lg mb-3">
                  <QrCode className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">Scan QR code for quick access to your appointment details</p>
              </CardContent>
            </Card>

            {/* Manage Appointment */}
            <Card>
              <CardHeader>
                <CardTitle>Manage Appointment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Reschedule
                </Button>
                <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                  <X className="h-4 w-4 mr-2" />
                  Cancel Appointment
                </Button>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>support@medicareplus.com</span>
                </div>
                <p className="text-xs text-gray-500">Available 24/7 for appointment assistance</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Thank you for choosing MediCare Plus. We look forward to seeing you!</p>
          <p className="mt-1">
            Please save this confirmation for your records. Confirmation #: {appointmentData.confirmationNumber}
          </p>
        </div>
      </div>
      </div>  
      
      :
      <div>
       <Skeleton/>
      </div>
    }
    </div>
    
 
  )
}

// Helper function to convert 12-hour time to 24-hour format
function convertTo24Hour(time12h: string): string {
  const [time, modifier] = time12h.split(" ")
  let [hours, minutes] = time.split(":")
  if (hours === "12") {
    hours = "00"
  }
  if (modifier === "PM") {
    hours = (Number.parseInt(hours, 10) + 12).toString()
  }
  return `${hours}:${minutes}:00`
}
