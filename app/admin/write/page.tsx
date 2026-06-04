'use client';

import { useEffect, useState } from 'react';
import { createPost } from '@/app/actions';
import Image from 'next/image';
import { useThemeStore } from '@/store/useThemeStore';
import CateSelect from '@/components/common/CateSelect';
import { useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function WritePage() {
  const { isDark } = useThemeStore();
  const [showIntro, setShowIntro] = useState(false);
  const [introText, setIntroText] = useState('');

  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    if (error === 'invalid_password') {
      alert('권한이 없습니다. 비밀번호를 확인해주세요.');
    }
  }, [error]);

  const [sections, setSections] = useState([
    {
      subTitle: '',
      content: '',
    },
  ]);

  // 섹션 추가
  const addSection = () => {
    setSections([...sections, { subTitle: '', content: '' }]);
  };

  // 섹션 내용 변경
  const handleSectionChange = (index: number, field: 'subTitle' | 'content', value: string) => {
    const newSection = [...sections];
    newSection[index][field] = value;
    setSections(newSection);
  };

  // 섹션 삭제 함수
  const removeSection = (index: number) => {
    if (sections.length > 1) {
      setSections(sections.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="max-w-281 mx-auto py-22">
      <form action={createPost} className="flex flex-col gap-10">
        <div className="w-full flex justify-between items-center relative">
          <input className="text-title" name="title" placeholder="제목을 입력하세요" required />

          <div className="absolute right-0 top-0">
            <CateSelect />
          </div>
        </div>

        <div className="w-full h-px bg-text-3/70"></div>

        {/* intro section */}
        <div className="flex flex-col">
          {!showIntro ? (
            <button
              type="button"
              onClick={() => setShowIntro(true)}
              className="flex items-center group-[]: justify-center rounded-main bg-bg-component border border-text-point/50 py-5">
              <span className="text-text-2 text-20">Intro 추가하기</span>
              <Image
                src={isDark ? '/icons/bkIconAdd.svg' : '/icons/whIconAdd.svg'}
                alt="추가 버튼"
                width={24}
                height={24}
              />
            </button>
          ) : (
            <div className="bg-bg-component border border-text-point/30 rounded-main p-8 relative">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sub-title text-text-point">INTRO</span>
                <button
                  type="button"
                  onClick={() => {
                    setShowIntro(false);
                    setIntroText('');
                  }}>
                  <Image
                    src={isDark ? '/icons/bkIconClose.svg' : '/icons/whIconClose.svg'}
                    alt="인트로 삭제"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
              <textarea
                name="intro"
                value={introText}
                onChange={(e) => setIntroText(e.target.value)}
                placeholder="포스트의 도입부를 작성해주세요"
                className="w-full h-32 bg-transparent outline-none resize-none text-body"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-10">
              {sections.map((section, index) => (
                <div key={index} className="bg-point/20 border border-text-point/30 rounded-main">
                  <div className="flex flex-col gap-5 px-9 py-5">
                    {/* 서브 타이틀 입력 인풋 */}
                    <div className="flex justify-between">
                      <input
                        name={`subTitle_${index}`}
                        value={section.subTitle}
                        onChange={(e) => handleSectionChange(index, 'subTitle', e.target.value)}
                        placeholder="부제목을 입력해주세요"
                        className="text-sub-title"
                      />
                      {sections.length > 1 && (
                        <button type="button" onClick={() => removeSection(index)}>
                          <Image
                            className="opacity-40 hover:opacity-100"
                            src={isDark ? '/icons/bkIconClose.svg' : '/icons/whIconClose.svg'}
                            alt="섹션 삭제하기"
                            width={30}
                            height={30}
                          />
                        </button>
                      )}
                    </div>

                    <div className="w-full h-px bg-text-3/70"></div>

                    {/* 내용 입력란 */}
                    <textarea
                      name={`content_${index}`}
                      value={section.content}
                      onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                      placeholder="내용을 입력해주세요"
                      className="w-full h-32 text-body"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* 섹션 추가 버튼 */}
            <button
              type="button"
              className="w-full flex items-center justify-center bg-point/40 border border-text-point/20 p-5 rounded-main
          hover:bg-point hover:border-text-point/70 text-20 hover:text-20-bold text-text-2"
              onClick={addSection}>
              <span>추가하기</span>
            </button>
          </div>

          <div className="flex flex-col gap-5">
            <input
              name="adminPassword"
              type="passwords"
              placeholder="관리자 암호"
              className="p-4 rounded flex items-center justify-center bg-point/40 border border-text-point/20
          hover:bg-point hover:border-text-point/70 text-20 hover:text-20-bold text-text-2"
              required
            />
            <button
              type="submit"
              className="p-5 rounded-main bg-bg-component border border-text-point/50
              hover:shadow-default text-20 hover:text-20-bold">
              포스트 게시
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
