// PenEvents.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include "pch.h"
#include <iostream>

LRESULT CALLBACK TestWindowProc(
	_In_ HWND   hwnd,
	_In_ UINT   uMsg,
	_In_ WPARAM wParam,
	_In_ LPARAM lParam
) {

	switch (uMsg)
	{
	case WM_CREATE:
		// Initialize the window. 
		return 0;

	case WM_PAINT:
	{
		// Paint the window's client area. 
		PAINTSTRUCT ps;
		if (BeginPaint(hwnd, &ps)) {
			EndPaint(hwnd, &ps);
		}
		return 0;
	}

	case WM_SIZE:
		// Set the size and position of the window. 
		return 0;

	case WM_DESTROY:
		// Clean up window-specific data objects. 
		return 0;

	case WM_RBUTTONDOWN:
		std::cout << "WM_RBUTTONDOWN" << std::endl;
		return 0;

	case WM_RBUTTONUP:
		std::cout << "WM_RBUTTONUP" << std::endl;
		return 0;

	case WM_LBUTTONDOWN:
		std::cout << "WM_LBUTTONDOWN" << std::endl;
		return 0;

	case WM_LBUTTONUP:
		std::cout << "WM_LBUTTONUP" << std::endl;
		return 0;

	case WM_HOTKEY:
		std::cout << "WM_HOTKEY " << wParam << std::endl;
		return 0;

	case WM_KEYDOWN:
		std::cout << "WM_KEYDOWN " << wParam << std::endl;
		return 0;

	case WM_KEYUP:
		std::cout << "WM_KEYUP " << wParam << std::endl;
		return 0;

	case WM_COMMAND:
		std::cout << "WM_COMMAND" << wParam << std::endl;
		return 0;

	default:
		// Process messages not handled directly by this WNDPROC. 

		return DefWindowProc(hwnd, uMsg, wParam, lParam);
	}

	return 0;
}

int main()
{
	WNDCLASSEX wndClassEx = {0};
	wndClassEx.cbSize = sizeof(WNDCLASSEX);
	wndClassEx.lpszClassName = L"TEST";
	wndClassEx.lpfnWndProc = TestWindowProc;
	wndClassEx.hInstance = GetModuleHandle(nullptr);
	wndClassEx.hbrBackground = nullptr; // (HBRUSH)(COLOR_WINDOW + 1);

	if (RegisterClassEx(&wndClassEx) == 0) {
		std::cout << "Failure calling RegisterClassEx; GetLastError() == " << GetLastError() << std::endl;
		return 0;
	}

	DWORD dwExStyle = 0;
	DWORD dwStyle = WS_OVERLAPPEDWINDOW | WS_VISIBLE;

	HWND hwnd = CreateWindowEx(
		dwExStyle,
		/*lpClassName*/wndClassEx.lpszClassName,
		/*lpWindowName*/L"MyWindow",
		dwStyle,
		/*X*/CW_USEDEFAULT,
		/*Y*/CW_USEDEFAULT,
		/*nWidth*/CW_USEDEFAULT,
		/*nHeight*/CW_USEDEFAULT,
		/*hWndParent*/nullptr,
		/*hMenu*/nullptr,
		/*hInstance*/wndClassEx.hInstance,
		/*lpParam*/nullptr
	);

	if (hwnd == nullptr) {
		std::cout << "NULL HWND; GetLastError() == " << GetLastError() << std::endl;
		return 0;
	}

	if (!RegisterHotKey(
		hwnd,
		3,
		/*fsModifiers*/MOD_WIN,
		VK_F18
	)) {
		std::cout << "Failed to register WIN+F18 hotkey; GetLastError() == " << GetLastError() << std::endl;
		return 0;
	}

	if (!RegisterHotKey(
		hwnd,
		2,
		/*fsModifiers*/MOD_WIN,
		VK_F19
	)) {
		std::cout << "Failed to register WIN+F19 hotkey; GetLastError() == " << GetLastError() << std::endl;
		return 0;
	}

	if (!RegisterHotKey(
		hwnd,
		1,
		/*fsModifiers*/MOD_WIN,
		VK_F20
	)) {
		std::cout << "Failed to register WIN+F20 hotkey; GetLastError() == " << GetLastError() << std::endl;
		return 0;
	}

	MSG msg;
	while (GetMessage(&msg, hwnd, 0, 0))
	{
		TranslateMessage(&msg);
		DispatchMessage(&msg);
	}

	return 0;
}

// Run program: Ctrl + F5 or Debug > Start Without Debugging menu
// Debug program: F5 or Debug > Start Debugging menu

// Tips for Getting Started: 
//   1. Use the Solution Explorer window to add/manage files
//   2. Use the Team Explorer window to connect to source control
//   3. Use the Output window to see build output and other messages
//   4. Use the Error List window to view errors
//   5. Go to Project > Add New Item to create new code files, or Project > Add Existing Item to add existing code files to the project
//   6. In the future, to open this project again, go to File > Open > Project and select the .sln file
