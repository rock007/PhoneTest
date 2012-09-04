package mx.spring.service.util;

import java.io.File;
import java.io.FileFilter;

public class ZipFileFilter implements FileFilter {

	public boolean accept(File pathname) {
		if (pathname.isDirectory())
			return true;
		else {
			String name = pathname.getName();
			return match(name);
		}
	}

	private boolean match(String name) {
		if (name.toUpperCase().endsWith("ZIP"))
			return true;
		return false;
	}

}
