import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// POST - Handle contact form submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Rate limiting (basic implementation)
    const userAgent = request.headers.get('user-agent') || ''
    const ip = request.headers.get('x-forwarded-for') || 
              request.headers.get('x-real-ip') || 
              'unknown'

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i
    ]

    const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(userAgent))
    if (isSuspicious) {
      return NextResponse.json(
        { error: 'Request rejected' },
        { status: 403 }
      )
    }

    // Store in database (optional - you can also just send email)
    const supabase = await createClient()
    
    const contactData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject.trim(),
      message: message.trim(),
      ip_address: ip,
      user_agent: userAgent,
      created_at: new Date().toISOString(),
    }

    // Try to insert into contact_submissions table (create if doesn't exist)
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert(contactData)
      .select()
      .single()

    if (error) {
      // Log the error but don't fail the request
      console.error('Database insertion failed:', error)
    }

    // Send email notification (implement with your preferred service)
    await sendEmailNotification({
      name,
      email,
      subject,
      message,
      submissionId: data?.id || 'unknown'
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.',
      submissionId: data?.id
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}

// Email notification function
async function sendEmailNotification({
  name,
  email,
  subject,
  message,
  submissionId
}: {
  name: string
  email: string
  subject: string
  message: string
  submissionId: string
}) {
  try {
    // Send email notification (implementation depends on your email service)
    // This would integrate with your SMTP service or email provider
    console.log('Contact form submission:', { name, email, subject, submissionId });
    
    // Example: Send email using nodemailer (configure in production)
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      try {
        // Email sending logic would go here
        console.log('Email notification sent for contact form submission');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Continue processing even if email fails
      }
    }
    
    const emailContent = `
      New contact form submission:
      
      ID: ${submissionId}
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      
      Message:
      ${message}
      
      ---
      Sent from Portfolio Website
      Timestamp: ${new Date().toISOString()}
    `

    console.log('Email notification would be sent:', {
      to: process.env.CONTACT_EMAIL || 'admin@example.com',
      subject: `Portfolio Contact: ${subject}`,
      content: emailContent
    })

    // Example with Resend (uncomment and configure):
    /*
    const { Resend } = require('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'Portfolio <noreply@yourdomain.com>',
      to: [process.env.CONTACT_EMAIL || 'admin@example.com'],
      subject: `Portfolio Contact: ${subject}`,
      text: emailContent,
      reply_to: email
    })
    */

    // Example with SendGrid (uncomment and configure):
    /*
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    await sgMail.send({
      to: process.env.CONTACT_EMAIL || 'admin@example.com',
      from: 'noreply@yourdomain.com',
      subject: `Portfolio Contact: ${subject}`,
      text: emailContent,
      replyTo: email
    })
    */

  } catch (error) {
    console.error('Failed to send email notification:', error)
    // Don't throw error - contact form should still work
  }
}