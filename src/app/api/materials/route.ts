import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data/materials.json');

// 자료 목록 가져오기
export async function GET() {
  try {
    const fileContents = await fs.readFile(DATA_PATH, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ materials: [] });
  }
}

// 새로운 자료 추가하기
export async function POST(request: Request) {
  try {
    const { title, url, category, id, password } = await request.json();

    // 환경 변수에서 비밀번호 가져오기
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const fileContents = await fs.readFile(DATA_PATH, 'utf8');
    const data = JSON.parse(fileContents);

    const newMaterial = {
      id: id || Date.now().toString(),
      title,
      url,
      category: category || '수업 자료',
      createdAt: new Date().toISOString().split('T')[0],
    };

    data.materials.push(newMaterial);

    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, material: newMaterial });
  } catch (error) {
    console.error('Error saving material:', error);
    return NextResponse.json({ error: 'Failed to save material' }, { status: 500 });
  }
}

// 자료 수정하기
export async function PUT(request: Request) {
  try {
    const { id, title, url, category, password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const fileContents = await fs.readFile(DATA_PATH, 'utf8');
    const data = JSON.parse(fileContents);

    const index = data.materials.findIndex((m: any) => m.id === id);
    if (index !== -1) {
      data.materials[index] = {
        ...data.materials[index],
        title,
        url,
        category,
        updatedAt: new Date().toISOString().split('T')[0],
      };

      await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
      return NextResponse.json({ success: true, material: data.materials[index] });
    }

    return NextResponse.json({ error: 'Material not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update material' }, { status: 500 });
  }
}

// 자료 삭제하기 (필요시)
export async function DELETE(request: Request) {
  try {
    const { id, password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const fileContents = await fs.readFile(DATA_PATH, 'utf8');
    const data = JSON.parse(fileContents);

    data.materials = data.materials.filter((m: any) => m.id !== id);

    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete material' }, { status: 500 });
  }
}
