"use client"

import type React from "react"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Clock, MapPin, Phone, Mail, User, Heart, Brain, Eye, Bone } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import axios from "axios"

const doctors = [
  {
    id: "1",
    name: "Dr. Kaushik Bhattacharya",
    specialty: "Cardiology",
    experience: "15 years",
    rating: 4.9,
    image: "/placeholder.svg?height=100&width=100",
    icon: Heart,
    availableSlots: ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"],
  },
  {
    id: "2",
    name: "Dr. Santu Banerjee",
    specialty: "Neurology",
    experience: "12 years",
    rating: 4.8,
    image: "/placeholder.svg?height=100&width=100",
    icon: Brain,
    availableSlots: ["8:30 AM", "11:00 AM", "1:30 PM", "4:00 PM"],
  },
  {
    id: "3",
    name: "Dr. Anubrata Mondal",
    specialty: "Ophthalmology",
    experience: "10 years",
    rating: 4.9,
    image: "/placeholder.svg?height=100&width=100",
    icon: Eye,
    availableSlots: ["9:30 AM", "11:30 AM", "2:30 PM", "4:30 PM"],
  },
  {
    id: "4",
    name: "Dr. Mamata Banerjee",
    specialty: "Orthopedics",
    experience: "18 years",
    rating: 4.7,
    image: "/placeholder.svg?height=100&width=100",
    icon: Bone,
    availableSlots: ["8:00 AM", "10:00 AM", "1:00 PM", "3:00 PM"],
  },
]

const appointmentTypes = [
  "General Consultation",
  "Follow-up Visit",
  "Annual Check-up",
  "Specialist Consultation",
  "Emergency Consultation",
  "Preventive Care",
]

export default function Component() {

  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({
    doctor: "",
    f_name: "",
    l_name: "",
    time: "",
    date:"",
    email: "",
    phone_num: "",
    dateOfBirth: "",
    gender: "",
    appointmentType: "",
    reason: "",
    insurance: "",
    emergencyContact: "",
    emergencyPhone: "",
  })
  const BE_URI = process.env.NEXT_PUBLIC_BE_URI
  const selectedDoctorData = doctors.find((doc) => doc.id === selectedDoctor)

  // const handleInputChange = (field: string, value: string) => {
  //   setFormData((prev) => ({ ...prev, [field]: value }))
  // }
  
  const docHandleSelect = (docId: string, docName: string) =>{
         setSelectedDoctor(docId);
         setFormData({...formData, doctor: docName, time: selectedTime})
  }
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    
    const date: string = selectedDate?.toString() ?? "";
    setFormData({...formData, date: date});
    const userDetStr = localStorage.getItem("user_det");
    const userToken = userDetStr ? JSON.parse(userDetStr).token : null;
    if (!userToken) {
      toast.error("User not logged in or user data missing.");
      return;
    }
    console.log(userToken)
    const reqBody = {doctor: formData.doctor, f_name: formData.f_name, l_name: formData.l_name, email: formData.email, phone_num: formData.phone_num  }
    const res = await axios.post(`${BE_URI}/appointments/book`, reqBody, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });

    const resStr = JSON.stringify(res.data)
    localStorage.setItem("appointment", resStr);
    toast.success("Appointment booked successfull!");
    router.push("/patientDet")
  }

  const isFormValid =
    selectedDate &&
    selectedDoctor &&
    selectedTime &&
    formData.f_name &&
    formData.l_name &&
    formData.email &&
    formData.phone_num

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Book Your Appointment</h2>
          <p className="text-gray-600">Schedule a consultation with our experienced healthcare professionals</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Select Doctor
                </CardTitle>
                <CardDescription>Choose your preferred healthcare provider</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {doctors.map((doctor) => {
                    const IconComponent = doctor.icon
                    return (
                      <div
                        key={doctor.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedDoctor === doctor.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={()=>{docHandleSelect(doctor.id, doctor.name)}}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                            <AvatarFallback>
                              <IconComponent className="h-6 w-6" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                            <p className="text-sm text-gray-600">{doctor.specialty}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {doctor.experience}
                              </Badge>
                              <span className="text-xs text-gray-500">★ {doctor.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Date and Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  Select Date & Time
                </CardTitle>
                <CardDescription>Choose your preferred appointment slot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Select Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      className="rounded-md border"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Available Time Slots</Label>
                    {selectedDoctorData && selectedDate ? (
                      <div className="grid grid-cols-2 gap-2">
                        {selectedDoctorData.availableSlots.map((slot) => (
                          <Button
                            key={slot}
                            variant={selectedTime === slot ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(slot)}
                            className="justify-start"
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            {slot}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Please select a doctor and date first</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Patient Information */}
            <Card>
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
                <CardDescription>Please provide your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.f_name}
                      onChange={(e) => {setFormData({...formData, f_name: e.target.value})}}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.l_name}
                      onChange={(e) => {setFormData({...formData, l_name: e.target.value})}}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {setFormData({...formData, email: e.target.value})}}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone_num}
                      onChange={(e) => {setFormData({...formData, phone_num: e.target.value})}}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => {setFormData({...formData, dateOfBirth: e.target.value})}}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => {setFormData({...formData, gender: value})}}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="appointmentType">Appointment Type</Label>
                  <Select
                    value={formData.appointmentType}
                    onValueChange={(value) => {setFormData({...formData, appointmentType: value})}}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select appointment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {appointmentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="reason">Reason for Visit</Label>
                  <Textarea
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => {setFormData({...formData, reason: e.target.value})}}
                    placeholder="Please describe your symptoms or reason for the appointment"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="insurance">Insurance Provider</Label>
                  <Input
                    id="insurance"
                    value={formData.insurance}
                    onChange={(e) => {setFormData({...formData, insurance: e.target.value})}}
                    placeholder="Enter your insurance provider"
                  />
                </div>
                <Separator />
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                    <Input
                      id="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={(e) => {setFormData({...formData, emergencyContact: e.target.value})}}
                      placeholder="Emergency contact name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                    <Input
                      id="emergencyPhone"
                      type="tel"
                      value={formData.emergencyPhone}
                      onChange={(e) => {setFormData({...formData, emergencyPhone: e.target.value})}}
                      placeholder="Emergency contact phone"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appointment Summary */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Appointment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedDoctorData && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedDoctorData.image || "/placeholder.svg"} alt={selectedDoctorData.name} />
                      <AvatarFallback>
                        <selectedDoctorData.icon className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedDoctorData.name}</h3>
                      <p className="text-sm text-gray-600">{selectedDoctorData.specialty}</p>
                    </div>
                  </div>
                )}

                {selectedDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarDays className="h-4 w-4 text-gray-500" />
                    <span>
                      {selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}

                {selectedTime && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{selectedTime}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>Consult Ease, Earth</span>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Consultation Fee</span>
                    <span>Rs 150</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Booking Fee</span>
                    <span>Rs 50</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>Rs 200</span>
                  </div>
                </div>

                <Button onClick={handleSubmit} disabled={!isFormValid} className="w-full" size="lg">
                  Book Appointment
                </Button>

                <p className="text-xs text-gray-500 text-center">By booking, you agree to our terms and conditions</p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>+91 1313131313</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>support@consultease.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>1234 Procrastination Avenue, Nowhereville</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
