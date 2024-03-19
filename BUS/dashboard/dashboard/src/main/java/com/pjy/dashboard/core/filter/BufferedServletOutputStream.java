package com.pjy.dashboard.core.filter;

import java.io.ByteArrayOutputStream;

import javax.servlet.ServletOutputStream;
import javax.servlet.WriteListener;

public class BufferedServletOutputStream extends ServletOutputStream {
	private ByteArrayOutputStream bos = new ByteArrayOutputStream();

	/** * @return the contents of the buffer. */
	public byte[] getBuffer() {
		return this.bos.toByteArray();
	}

	/** * This method must be defined for custom servlet output streams. */
	public void write(int data) {
		this.bos.write(data);
	}

	public void reset() {
		this.bos.reset();
	}

	public void setBufferSize(int size) {
		this.bos = new ByteArrayOutputStream(size);
	}

	@Override
	public boolean isReady() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void setWriteListener(WriteListener listener) {
		// TODO Auto-generated method stub
		
	}
}