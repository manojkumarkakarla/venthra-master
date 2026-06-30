import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { name, email, phone, company, projectType, budget, timeline, description } = req.body;

        // Validate required fields
        if (!name || !email || !projectType) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Email Configuration
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Missing EMAIL_USER or EMAIL_PASS environment variables');
            return res.status(500).json({ success: false, message: 'Server configuration error: Email credentials missing' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"Venthra Solutions" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `🚀 New Project Inquiry: ${projectType} from ${name}`,
            html: `
                <div style="background-color: #0c1427; padding: 40px 20px; font-family: 'Inter', sans-serif;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.3); border-collapse: collapse;">
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); padding: 40px 30px; text-align: center;">
                                <div style="display: inline-block; padding: 12px; border-radius: 16px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); margin-bottom: 20px;">
                                    <img src="https://venthrasolutions.online/vts-logo.jpeg" alt="VTS" style="width: 48px; border-radius: 8px;">
                                </div>
                                <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">New Project Inquiry</h1>
                                <p style="color: #bfdbfe; margin: 10px 0 0 0; font-size: 15px; font-weight: 500;">Lead captured via Venthra Solutions</p>
                            </td>
                        </tr>

                        <!-- Main Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <!-- Client Highlight Card -->
                                <div style="background-color: #f8fafc; border-radius: 20px; padding: 25px; border: 1px solid #e2e8f0; margin-bottom: 30px;">
                                    <h2 style="color: #1e3a8a; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 0; margin-bottom: 20px; font-weight: 700;">👤 Lead Information</h2>
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                        <tr>
                                            <td style="padding-bottom: 15px;">
                                                <div style="font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; margin-bottom: 4px;">FullName</div>
                                                <div style="font-size: 18px; color: #0f172a; font-weight: 700;">${name}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                                    <tr>
                                                        <td width="50%" style="padding-bottom: 15px;">
                                                            <div style="font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; margin-bottom: 4px;">Email Address</div>
                                                            <div style="font-size: 14px; color: #2563eb; font-weight: 600;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></div>
                                                        </td>
                                                        <td width="50%" style="padding-bottom: 15px;">
                                                            <div style="font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; margin-bottom: 4px;">Phone</div>
                                                            <div style="font-size: 14px; color: #0f172a; font-weight: 600;">${phone}</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div style="font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; margin-bottom: 4px;">Company / Brand</div>
                                                <div style="font-size: 14px; color: #0f172a; font-weight: 600;">${company || 'N/A'}</div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>

                                <!-- Project Specs Table -->
                                <div style="margin-bottom: 30px;">
                                    <h2 style="color: #1e3a8a; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 15px; font-weight: 700;">🚀 Project Specs</h2>
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: separate; border-spacing: 0 8px;">
                                        <tr>
                                            <td style="background-color: #f1f5f9; padding: 12px 20px; border-radius: 12px 0 0 12px; color: #475569; font-size: 13px; font-weight: 600; width: 40%;">Project Type</td>
                                            <td style="background-color: #f1f5f9; padding: 12px 20px; border-radius: 0 12px 12px 0; color: #0f172a; font-size: 14px; font-weight: 700; text-align: right;">${projectType}</td>
                                        </tr>
                                        <tr>
                                            <td style="background-color: #f1f5f9; padding: 12px 20px; border-radius: 12px 0 0 12px; color: #475569; font-size: 13px; font-weight: 600;">Budget Range</td>
                                            <td style="background-color: #f1f5f9; padding: 12px 20px; border-radius: 0 12px 12px 0; color: #059669; font-size: 14px; font-weight: 700; text-align: right;">${budget}</td>
                                        </tr>
                                        <tr>
                                            <td style="background-color: #f1f5f9; padding: 12px 20px; border-radius: 12px 0 0 12px; color: #475569; font-size: 13px; font-weight: 600;">Timeline</td>
                                            <td style="background-color: #f1f5f9; padding: 12px 20px; border-radius: 0 12px 12px 0; color: #0f172a; font-size: 14px; font-weight: 700; text-align: right;">${timeline}</td>
                                        </tr>
                                    </table>
                                </div>

                                <!-- Goals -->
                                <div style="border-top: 2px solid #f1f5f9; padding-top: 30px;">
                                    <h2 style="color: #1e3a8a; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 15px; font-weight: 700;">📝 Project Goals</h2>
                                    <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 20px; border-radius: 16px; color: #334155; line-height: 1.7; font-size: 15px; font-style: italic; border-left: 6px solid #1e40af;">
                                        "${description}"
                                    </div>
                                </div>

                                <!-- Reply Button -->
                                <div style="margin-top: 40px; text-align: center;">
                                    <a href="mailto:${email}" style="display: inline-block; background: #1e40af; color: #ffffff; padding: 16px 36px; border-radius: 14px; text-decoration: none; font-weight: 700; font-size: 16px;">
                                        Reply to Client Reach
                                    </a>
                                </div>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                                <p style="margin: 0; color: #94a3b8; font-size: 12px; font-weight: 500;">
                                    © 2024 Venthra Solutions CRM Integration.
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>
            `
        };

        const autoReplyOptions = {
            from: `"Venthra Solutions" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Your Vision, Our Tech — Confirmation of Inquiry`,
            html: `
                <div style="background-color: #f0f4f8; padding: 40px 20px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 32px; overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,0.1); border-collapse: collapse;">
                        <!-- Premium Header -->
                        <tr>
                            <td style="background-color: #0c1427; padding: 60px 40px; text-align: center; color: #ffffff;">
                                <div style="margin-bottom: 24px; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 4px; color: #3b82f6;">VENTHRA SOLUTIONS</div>
                                <h1 style="margin: 0; font-size: 32px; font-weight: 900; line-height: 1.2; letter-spacing: -1px; color: #ffffff;">Thank You for Reaching Out</h1>
                                <p style="margin: 16px auto 0; font-size: 18px; color: #94a3b8; max-width: 400px; font-weight: 400;">We've received your inquiry and we're already reviewing your details.</p>
                            </td>
                        </tr>

                        <!-- Confirmation Content -->
                        <tr>
                            <td style="padding: 50px 40px; text-align: center;">
                                <div style="font-size: 18px; color: #1e293b; line-height: 1.6; margin-bottom: 40px;">
                                    Hi <strong>${name}</strong>,<br><br>
                                    We're excited to partner with you on your <strong>${projectType}</strong> project. Our team is committed to delivering digital excellence that scales with your ambition.
                                </div>

                                <!-- Info Card Table -->
                                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #f8fafc; border-radius: 24px; margin-bottom: 40px; border: 1px solid #e2e8f0;">
                                    <tr>
                                        <td style="padding: 25px; text-align: left; border-right: 1px solid #e2e8f0; width: 50%;">
                                            <span style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 4px;">Inquiry Type</span>
                                            <span style="font-size: 15px; color: #0f172a; font-weight: 600;">${projectType} Development</span>
                                        </td>
                                        <td style="padding: 25px; text-align: left; width: 50%;">
                                            <span style="font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 4px;">Next Step</span>
                                            <span style="font-size: 15px; color: #3b82f6; font-weight: 600;">Discovery Call within 24 Hours</span>
                                        </td>
                                    </tr>
                                </table>

                                <p style="color: #475569; font-size: 15px; line-height: 1.7; margin-bottom: 40px;">
                                    Our experts will reach out soon to discuss the scope and start turning your vision into a high-performance reality.
                                </p>

                                <!-- Bulletproof Button -->
                                <div>
                                    <!--[if mso]>
                                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://venthrasolutions.online/our-work" style="height:60px;v-text-anchor:middle;width:250px;" arcsize="50%" stroke="f" fillcolor="#0c1427">
                                        <w:anchorlock/>
                                        <center>
                                    <![endif]-->
                                    <a href="https://venthrasolutions.online/our-work" target="_blank"
                                       style="background-color:#0c1427;border-radius:100px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:16px;font-weight:800;line-height:60px;text-align:center;text-decoration:none;width:250px;-webkit-text-size-adjust:none;">Explore Our Portfolio</a>
                                    <!--[if mso]>
                                        </center>
                                    </v:roundrect>
                                    <![endif]-->
                                </div>
                            </td>
                        </tr>

                        <!-- Premium Footer -->
                        <tr>
                            <td style="background-color: #f8fafc; padding: 40px; text-align: center; border-top: 1px solid #f1f5f9;">
                                <p style="margin: 0 0 10px 0; color: #1e293b; font-weight: 800; font-size: 18px; letter-spacing: -0.5px;">Venthra Solutions</p>
                                <p style="margin: 0 0 25px 0; color: #64748b; font-size: 13px; font-weight: 500;">Digital Excellence. Crafted for Growth.</p>
                                
                                <div style="margin: 0 auto 25px; border-top: 1px solid #e2e8f0; width: 40px;"></div>

                                <p style="margin: 0; color: #94a3b8; font-size: 13px; line-height: 1.7;">
                                    <a href="mailto:venthra.solutions@gmail.com" style="color: #3b82f6; text-decoration: none; font-weight: 600;">venthra.solutions@gmail.com</a><br>
                                    +91 83091 88820
                                </p>
                            </td>
                        </tr>
                    </table>
                    <div style="text-align: center; margin-top: 30px; color: #94a3b8; font-size: 11px; font-weight: 500;">
                        Sent by Venthra Intelligent Mailer Services
                    </div>
                </div>
            `
        };

        console.log(`Attempting to send notification email to owner (${process.env.EMAIL_USER})...`);
        const info1 = await transporter.sendMail(mailOptions);
        console.log('Notification email sent:', info1.messageId);

        console.log(`Attempting to send auto-reply to user (${email})...`);
        const info2 = await transporter.sendMail(autoReplyOptions);
        console.log('Auto-reply email sent:', info2.messageId);

        return res.status(200).json({ success: true, message: 'Both emails sent successfully!' });

    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, message: 'Failed to send email.', error: error.message });
    }
}
