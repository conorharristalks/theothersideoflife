'use client';

import { format } from 'date-fns/format';
import { FormEvent, ChangeEvent } from 'react';
import { VALIDATION, COUNTRY_CODES } from '@/lib/constants';
import { useState } from 'react';

interface BookingFormProps {
  selectedDate: Date;
  initialData?: BookingFormData;
  onSubmit: (formData: BookingFormData) => Promise<void>;
  onCancel: () => void;
}

export interface BookingFormData {
  schoolName: string;
  contactName: string;
  email: string;
  countryCode: string;
  phone: string; // This should be the number WITHOUT country code
  address: string;
  city: string;
  numberOfTalks: number;
  includeWorkshop: boolean;
}

// Add helper function to parse phone numbers
export const parsePhoneNumber = (fullPhone: string): { countryCode: string; phone: string } => {
  if (!fullPhone) return { countryCode: '+353', phone: '' };
  
  // Match pattern: +countrycode followed by space and number
  const phoneMatch = fullPhone.match(/^(\+\d{1,4})\s*(.+)$/);
  if (phoneMatch) {
    return {
      countryCode: phoneMatch[1].trim(),
      phone: phoneMatch[2].trim()
    };
  }
  
  // If no country code found, assume it's a local number
  return {
    countryCode: '+353',
    phone: fullPhone.trim()
  };
};

interface FormErrors {
  [key: string]: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ selectedDate, initialData, onSubmit, onCancel }) => {
  // Parse existing phone number if it contains a country code
  const parseExistingPhone = (phoneString?: string) => {
    if (!phoneString) return { countryCode: '+353', phone: '' };
    
    // Check if phone already contains a country code
    const phoneMatch = phoneString.match(/^(\+\d{1,4})\s*(.+)$/);
    if (phoneMatch) {
      return {
        countryCode: phoneMatch[1], // e.g., "+353"
        phone: phoneMatch[2].trim() // e.g., "87 123 4567"
      };
    }
    
    // If no country code found, assume it's a local number
    return {
      countryCode: '+353',
      phone: phoneString
    };
  };

  const [formData, setFormData] = useState<BookingFormData>(() => {
    if (initialData) {
      const { countryCode, phone } = parseExistingPhone(initialData.phone);
      return {
        ...initialData,
        countryCode,
        phone
      };
    }
    
    return {
      schoolName: '',
      contactName: '',
      email: '',
      countryCode: '+353', // Default to Ireland
      phone: '',
      address: '',
      city: '',
      numberOfTalks: 1,
      includeWorkshop: false
    };
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate school name
    if (!formData.schoolName.trim()) {
      newErrors.schoolName = 'School name is required';
    }
    
    // Validate contact name
    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate phone - simple validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!VALIDATION.PHONE_REGEX.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Validate address
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    // Validate city
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }    // Validate number of talks
    if (formData.numberOfTalks < 1 || formData.numberOfTalks > 5) {
      newErrors.numberOfTalks = 'Number of talks must be between 1 and 5';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked
        : name === 'numberOfTalks' 
        ? parseInt(value, 10) 
        : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Combine country code and phone number before submitting
      // But only if the phone doesn't already start with a country code
      let fullPhoneNumber = formData.phone;
      
      // Check if phone already starts with a country code
      if (!formData.phone.startsWith('+')) {
        fullPhoneNumber = `${formData.countryCode} ${formData.phone}`;
      } else {
        // If it already has a country code, use as-is
        fullPhoneNumber = formData.phone;
      }
      
      const submissionData: BookingFormData = {
        schoolName: formData.schoolName,
        contactName: formData.contactName,
        email: formData.email,
        countryCode: formData.countryCode,
        phone: fullPhoneNumber,
        address: formData.address,
        city: formData.city,
        numberOfTalks: formData.numberOfTalks,
        includeWorkshop: formData.includeWorkshop
      };
      
      await onSubmit(submissionData);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Show a generic error message
      setErrors(prev => ({
        ...prev,
        form: 'An error occurred while submitting your booking. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="booking-form w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-fraunces font-bold mb-8 text-accent-1">Book for {format(selectedDate, 'EEEE, MMMM d, yyyy')}</h2>
      
      {errors.form && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-900/50 text-red-400 rounded-md">
          {errors.form}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* School Name */}
          <div className="form-group">
            <label htmlFor="schoolName" className="block text-sm font-medium text-foreground/90 mb-1.5">
              School Name *
            </label>
            <input
              type="text"
              id="schoolName"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              className={`w-full p-2.5 outline-none rounded-md transition-colors bg-primary text-foreground ${errors.schoolName ? 'border border-red-500 bg-red-500/10' : 'border border-white/20 focus:border-accent-1 focus:ring-1 focus:ring-accent-1'}`}
            />
            {errors.schoolName && (
              <p className="text-red-400 text-xs mt-1.5">{errors.schoolName}</p>
            )}
          </div>
          
          {/* Contact Person Name */}
          <div className="form-group">
            <label htmlFor="contactName" className="block text-sm font-medium text-foreground/90 mb-1.5">
              Contact Person Name *
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className={`w-full p-2.5 outline-none rounded-md transition-colors bg-primary text-foreground ${errors.contactName ? 'border border-red-500 bg-red-500/10' : 'border border-white/20 focus:border-accent-1 focus:ring-1 focus:ring-accent-1'}`}
            />
            {errors.contactName && (
              <p className="text-red-400 text-xs mt-1.5">{errors.contactName}</p>
            )}
          </div>
          
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-foreground/90 mb-1.5">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2.5 outline-none rounded-md transition-colors bg-primary text-foreground ${errors.email ? 'border border-red-500 bg-red-500/10' : 'border border-white/20 focus:border-accent-1 focus:ring-1 focus:ring-accent-1'}`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>
            )}
          </div>
          
          {/* Phone with Country Code */}
          <div className="form-group">
            <label htmlFor="phone" className="block text-sm font-medium text-foreground/90 mb-1.5">
              Phone Number *
            </label>
            <div className="flex">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="px-2 py-2.5 border border-white/20 rounded-l-md bg-primary-light text-foreground text-sm focus:outline-none focus:border-accent-1 w-24 cursor-pointer"
              >
                {COUNTRY_CODES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="87 123 4567"
                className={`flex-1 p-2.5 outline-none bg-primary text-foreground border border-l-0 rounded-r-md transition-colors ${errors.phone ? 'border-red-500 bg-red-500/10' : 'border-white/20 focus:border-accent-1 focus:ring-1 focus:ring-accent-1'}`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1.5">{errors.phone}</p>
            )}
            <p className="text-xs text-foreground/60 mt-2">
              Select your country code and enter your phone number
            </p>
          </div>
          
          {/* Address */}
          <div className="form-group md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-foreground/90 mb-1.5">
              Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full p-2.5 outline-none rounded-md transition-colors bg-primary text-foreground ${errors.address ? 'border border-red-500 bg-red-500/10' : 'border border-white/20 focus:border-accent-1 focus:ring-1 focus:ring-accent-1'}`}
            />
            {errors.address && (
              <p className="text-red-400 text-xs mt-1.5">{errors.address}</p>
            )}
          </div>
          
          {/* City */}
          <div className="form-group">
            <label htmlFor="city" className="block text-sm font-medium text-foreground/90 mb-1.5">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full p-2.5 outline-none rounded-md transition-colors bg-primary text-foreground ${errors.city ? 'border border-red-500 bg-red-500/10' : 'border border-white/20 focus:border-accent-1 focus:ring-1 focus:ring-accent-1'}`}
            />
            {errors.city && (
              <p className="text-red-400 text-xs mt-1.5">{errors.city}</p>
            )}
          </div>
            {/* Number of Talks */}
          <div className="form-group">
            <label htmlFor="numberOfTalks" className="block text-sm font-medium text-foreground/90 mb-1.5">
              Number of Talks Required *
            </label>
            <select
              id="numberOfTalks"
              name="numberOfTalks"
              value={formData.numberOfTalks}
              onChange={handleChange}
              className={`w-full p-2.5 outline-none rounded-md transition-colors bg-primary text-foreground cursor-pointer ${errors.numberOfTalks ? 'border border-red-500 bg-red-500/10' : 'border border-white/20 focus:border-accent-1 focus:ring-1 focus:ring-accent-1'}`}
            >
              {[1, 2].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            {errors.numberOfTalks && (
              <p className="text-red-400 text-xs mt-1.5">{errors.numberOfTalks}</p>
            )}
          </div>

          {/* Workshop Option */}
          <div className="form-group md:col-span-2 mt-2">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="includeWorkshop"
                  name="includeWorkshop"
                  type="checkbox"
                  checked={formData.includeWorkshop}
                  onChange={handleChange}
                  className="focus:ring-accent-1 h-5 w-5 border border-white/20 bg-primary cursor-pointer accent-accent-1 rounded shadow-sm"
                />
              </div>
              <div className="ml-3 text-sm flex flex-col pt-0.5">
                <label htmlFor="includeWorkshop" className="font-medium text-foreground cursor-pointer">
                  Include Workshop Session
                </label>
                <p className="text-foreground/60 mt-1">
                  Add an interactive workshop session in addition to the wellbeing talks. 
                  This includes hands-on activities and group exercises for students.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 text-sm font-bold text-foreground bg-primary border border-white/20 rounded-md hover:bg-primary-light transition-colors cursor-pointer"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-bold text-primary bg-accent-1 border border-transparent rounded-md hover:bg-accent-1/90 focus:outline-none min-w-[140px] flex items-center justify-center transition-colors cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Submit Booking'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;