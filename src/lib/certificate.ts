import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { sendCertificateEmail } from "@/lib/email";

export type CertificateGenerationParams = {
  enrollmentId: string;
  studentId: string;
};

export type RenderCertificateOptions = {
  studentName: string;
  courseTitle: string;
  discipline: string;
  instrument: string;
  sessionCount: number;
  accreditation?: string | null;
  certificateNumber: string;
  issuedAt: Date;
};

/**
 * Generate a Gandharva-branded Certificate PDF using pdf-lib.
 * Designed to look worthy of framing for grading exams.
 */
export async function renderCertificatePdf(
  options: RenderCertificateOptions,
): Promise<Uint8Array> {
  const {
    studentName,
    courseTitle,
    discipline,
    instrument,
    sessionCount,
    accreditation,
    certificateNumber,
    issuedAt,
  } = options;

  const pdfDoc = await PDFDocument.create();

  // A4 Landscape dimensions: 841.89 x 595.28 points
  const width = 841.89;
  const height = 595.28;
  const page = pdfDoc.addPage([width, height]);

  // Load standard fonts
  const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const times = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Gandharva brand palette
  const midnightViolet = rgb(18 / 255, 7 / 255, 43 / 255); // #12072B
  const saffron = rgb(255 / 255, 119 / 255, 3 / 255); // #FF7703
  const royalPurple = rgb(149 / 255, 6 / 255, 238 / 255); // #9506EE
  const metallicGold = rgb(212 / 255, 175 / 255, 55 / 255); // #D4AF37
  const softCharcoal = rgb(68 / 255, 64 / 255, 60 / 255); // #44403C
  const parchment = rgb(253 / 255, 251 / 255, 247 / 255); // #FDFBF7

  // 1. Parchment Background
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: parchment,
  });

  // 2. Triple Elegant Borders
  // Outer Midnight Violet border
  page.drawRectangle({
    x: 20,
    y: 20,
    width: width - 40,
    height: height - 40,
    borderColor: midnightViolet,
    borderWidth: 3.5,
  });

  // Middle Gold border
  page.drawRectangle({
    x: 26,
    y: 26,
    width: width - 52,
    height: height - 52,
    borderColor: metallicGold,
    borderWidth: 1.5,
  });

  // Inner Thin Purple border
  page.drawRectangle({
    x: 31,
    y: 31,
    width: width - 62,
    height: height - 62,
    borderColor: royalPurple,
    borderWidth: 0.75,
  });

  // Corner decorative diamond accents
  const cornerOffsets = [
    { x: 31, y: 31 },
    { x: width - 31, y: 31 },
    { x: 31, y: height - 31 },
    { x: width - 31, y: height - 31 },
  ];
  for (const c of cornerOffsets) {
    page.drawCircle({
      x: c.x,
      y: c.y,
      size: 4,
      color: metallicGold,
    });
  }

  // Helper for centering text
  const drawCenteredText = (
    text: string,
    font: typeof times,
    size: number,
    color: typeof midnightViolet,
    y: number,
  ) => {
    const textWidth = font.widthOfTextAtSize(text, size);
    page.drawText(text, {
      x: (width - textWidth) / 2,
      y,
      size,
      font,
      color,
    });
  };

  // 3. Header: Academy Title & Crest
  drawCenteredText(
    "GANDHARVA SCHOOL OF MUSIC",
    timesBold,
    24,
    midnightViolet,
    520,
  );

  drawCenteredText(
    "ACADEMY OF CLASSICAL & CONTEMPORARY PERFORMING ARTS",
    helveticaBold,
    8.5,
    saffron,
    504,
  );

  // Decorative gold rule
  page.drawLine({
    start: { x: width / 2 - 120, y: 494 },
    end: { x: width / 2 + 120, y: 494 },
    color: metallicGold,
    thickness: 1.2,
  });

  // 4. Certificate Award Title
  drawCenteredText(
    "CERTIFICATE OF COMPLETION",
    timesBold,
    18,
    royalPurple,
    462,
  );

  drawCenteredText(
    "This is to certify that",
    timesItalic,
    13,
    softCharcoal,
    432,
  );

  // 5. Student Name (Prominent)
  const studentFontSize = 28;
  const studentTextWidth = timesBold.widthOfTextAtSize(
    studentName,
    studentFontSize,
  );
  drawCenteredText(
    studentName,
    timesBold,
    studentFontSize,
    midnightViolet,
    390,
  );

  // Saffron underline below student name
  page.drawLine({
    start: { x: (width - studentTextWidth) / 2 - 15, y: 382 },
    end: { x: (width + studentTextWidth) / 2 + 15, y: 382 },
    color: saffron,
    thickness: 1.5,
  });

  // 6. Course & Curriculum Details
  drawCenteredText(
    "has successfully completed the prescribed curriculum and performance requirements for",
    timesItalic,
    12,
    softCharcoal,
    354,
  );

  drawCenteredText(courseTitle, timesBold, 20, saffron, 324);

  // Discipline, Instrument & Sessions detail
  let curriculumDetail = `Discipline: ${discipline} • Instrument: ${instrument} • ${sessionCount} Masterclass Sessions`;
  if (accreditation) {
    curriculumDetail += ` • Syllabus: ${accreditation}`;
  }
  drawCenteredText(curriculumDetail, helvetica, 10, softCharcoal, 298);

  // 7. Bottom Seal & Signatures
  // Left: Date Issued
  const formattedDate = issuedAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  page.drawText(`Date Issued: ${formattedDate}`, {
    x: 70,
    y: 165,
    size: 9.5,
    font: helvetica,
    color: softCharcoal,
  });

  page.drawText(`Credential ID: ${certificateNumber}`, {
    x: 70,
    y: 150,
    size: 9.5,
    font: helveticaBold,
    color: midnightViolet,
  });

  // Center: Official Gandharva Medallion Seal
  const sealX = width / 2;
  const sealY = 160;
  page.drawCircle({
    x: sealX,
    y: sealY,
    size: 28,
    color: parchment,
    borderColor: metallicGold,
    borderWidth: 2,
  });
  page.drawCircle({
    x: sealX,
    y: sealY,
    size: 24,
    borderColor: saffron,
    borderWidth: 1,
  });
  const sealText = "SEAL";
  const sealTextWidth = timesBold.widthOfTextAtSize(sealText, 10);
  page.drawText(sealText, {
    x: sealX - sealTextWidth / 2,
    y: sealY - 4,
    size: 10,
    font: timesBold,
    color: metallicGold,
  });

  // Left Signature
  page.drawLine({
    start: { x: 70, y: 105 },
    end: { x: 230, y: 105 },
    color: midnightViolet,
    thickness: 1,
  });
  page.drawText("Dr. Vikramaditya Gandharva", {
    x: 70,
    y: 90,
    size: 9.5,
    font: timesBold,
    color: midnightViolet,
  });
  page.drawText("Academic Director", {
    x: 70,
    y: 78,
    size: 8.5,
    font: helvetica,
    color: softCharcoal,
  });

  // Right Signature
  page.drawLine({
    start: { x: width - 230, y: 105 },
    end: { x: width - 70, y: 105 },
    color: midnightViolet,
    thickness: 1,
  });
  page.drawText("Elena Rostova", {
    x: width - 230,
    y: 90,
    size: 9.5,
    font: timesBold,
    color: midnightViolet,
  });
  page.drawText("Chair of Faculty", {
    x: width - 230,
    y: 78,
    size: 8.5,
    font: helvetica,
    color: softCharcoal,
  });

  // Footer verification notice
  drawCenteredText(
    "Verified Authenticated Credential • Gandharva School of Music • www.gandharvaschoolofmusic.com",
    helvetica,
    7.5,
    rgb(140 / 255, 130 / 255, 122 / 255),
    42,
  );

  return await pdfDoc.save();
}

/**
 * Generate, store to public/certificates, and create a Certificate row in the DB.
 * Idempotent: safe to call multiple times for the same enrollment.
 */
export async function generateAndStoreCertificate(
  params: CertificateGenerationParams,
) {
  const { enrollmentId, studentId } = params;

  // 1. Idempotency check: don't regenerate if already issued
  const existingCert = await db.certificate.findUnique({
    where: { enrollmentId },
  });
  if (existingCert) {
    logger.info(
      { certificateNumber: existingCert.certificateNumber, enrollmentId },
      "Certificate already exists for this enrollment",
    );
    return existingCert;
  }

  // 2. Fetch enrollment with course and student
  const enrollment = await db.enrollment.findUnique({
    where: { id: enrollmentId },
    include: {
      course: true,
      student: true,
    },
  });

  if (!enrollment) {
    throw new Error(`Enrollment not found: ${enrollmentId}`);
  }

  // 3. Generate sequential certificate number: GSM-{year}-{6-digit sequential}
  const year = new Date().getFullYear();
  const certCount = await db.certificate.count();
  const sequenceNum = String(certCount + 1).padStart(6, "0");
  const certificateNumber = `GSM-${year}-${sequenceNum}`;

  const issuedAt = new Date();

  // 4. Render PDF buffer
  const pdfBytes = await renderCertificatePdf({
    studentName: enrollment.student.name || "Student",
    courseTitle: enrollment.course.title,
    discipline: enrollment.course.discipline,
    instrument: enrollment.course.instrument,
    sessionCount: enrollment.course.sessionCount,
    accreditation: enrollment.course.accreditation,
    certificateNumber,
    issuedAt,
  });

  // 5. Save PDF file to public/certificates/
  const certDir = path.join(process.cwd(), "public", "certificates");
  if (!fs.existsSync(certDir)) {
    fs.mkdirSync(certDir, { recursive: true });
  }

  const fileName = `${certificateNumber}.pdf`;
  const filePath = path.join(certDir, fileName);
  fs.writeFileSync(filePath, Buffer.from(pdfBytes));

  const pdfUrl = `/certificates/${fileName}`;

  // 6. Store Certificate record in database
  const certificate = await db.certificate.create({
    data: {
      studentId: studentId || enrollment.studentId,
      enrollmentId,
      certificateNumber,
      pdfUrl,
      issuedAt,
    },
  });

  logger.info(
    { certificateId: certificate.id, certificateNumber, pdfUrl },
    "Certificate successfully issued and saved to storage",
  );

  // 7. Email student about the issued certificate
  if (enrollment.student.email) {
    try {
      await sendCertificateEmail({
        studentEmail: enrollment.student.email,
        studentName: enrollment.student.name || "Student",
        courseTitle: enrollment.course.title,
        certificateNumber,
        pdfUrl,
      });
    } catch (emailErr) {
      logger.error({ emailErr, certificateNumber }, "Failed to send certificate email");
    }
  }

  return certificate;
}
