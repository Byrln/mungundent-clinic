import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      );
    }

    // Get file extension
    const fileExtension = file.name.split('.').pop() || '';
    
    // Generate a unique filename
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Define the path where the file will be saved
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    // Ensure the uploads directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    const filePath = join(uploadDir, fileName);
    
    // Write the file to the filesystem
    await writeFile(filePath, buffer);
    
    // Return the URL to the uploaded file
    const fileUrl = `/uploads/${fileName}`;
    
    return NextResponse.json({ 
      success: true,
      url: fileUrl 
    });
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file', details: error.message },
      { status: 500 }
    );
  }
}